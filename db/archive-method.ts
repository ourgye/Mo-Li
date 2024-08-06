import { RecordDataWOID, RecordData } from "@/constants/types.interface";
import { useObject, useQuery, useRealm } from "@realm/react";
import ObjectID from "bson-objectid";
import { Record, Archive } from "./entities";
import { BSON } from "realm";

// 아카이브 생성
export function createArchive({ name }: { name: string }) {
  const realm = useRealm();
  const id = ObjectID();

  realm.write(() => {
    realm.create("Archive", {
      _id: id,
      name,
    });
  });
}

// 아카이브 수정
export function updateArchive({
  _id,
  name,
}: {
  _id: Realm.BSON.ObjectId;
  name: string;
}) {
  const realm = useRealm();
  const currArchive = useObject(Archive, _id);

  realm.write(() => {
    if (currArchive) {
      currArchive.name = name;
    }
  });
}

// 모든 아카이브 가져오기
export function getAllArchives() {
  // sorting 어떻게 할 지 정해야 함(현재는 이름으로)
  const archives = useQuery(Archive, (Archives) => {
    return Archives.sorted("name");
  });

  return Array.from(archives);
}

// 아카이브 _id와 이름만 가져오기
export function getArchiveData() {
  const archives = useQuery(Archive, (Archives) => {
    return Archives.sorted("name");
  });

  return archives.map((archive) => {
    return {
      _id: archive._id,
      name: archive.name,
    };
  });
}

// 첫번째 아카이브 가져오기
export function getFirstArchive() {
  const archives = useQuery(Archive, (Archives) => {
    return Archives.sorted("name");
  });

  if (archives.length === 0) {
    return {
      _id: new BSON.ObjectId(),
      name: "아카이브가 없습니다.",
    };
  }

  return {
    _id: archives[0]._id,
    name: archives[0].name,
  };
}

// 아카이브 삭제
// 레코드가 있는 아카이브는 어떻게 삭제되도록 하지?
// 모든 레코드 삭제 경고 후, 삭제하도록 하기
export function deleteArchive({ _id }: { _id: Realm.BSON.ObjectId }) {
  const realm = useRealm();
  const archive = useObject(Archive, _id);

  realm.write(() => {
    realm.delete(archive);
  });
}

// 아카이브 순서 변경
