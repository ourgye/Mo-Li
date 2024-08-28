import { useObject, useQuery, useRealm } from "@realm/react";
import { Archive } from "./entities";
import { ArchiveDataWithRecentDate } from "@/constants/types.interface";

// 아카이브 생성
export function createArchive({ name, index }: { name: string, index: number }) {
  const realm = useRealm();
  const id = new Realm.BSON.ObjectID();

  realm.write(() => {
    realm.create("Archive", {
      _id: id,
      name,
      index,
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

export function getAllArchives() {
  const archives = useQuery({
    type: Archive,
    query: (Archives) => {
      return Archives.sorted("name");
    },
  });

  const noRecordArchives = archives.map((archive) => {
    return {
      _id: archive._id,
      name: archive.name,
    };
  }); // 레코드가 없는 아카이브만 가져오기

  return noRecordArchives;
}

// 아카이브 레코드 없이 가져오기
export function getArchiveWORecord() {
  const archives = useQuery({
    type: Archive,
    query: (Archives) => {
      return Archives.sorted("index");
    },
  });

  return archives.map((archive) => {
    const records = archive.records.sorted("date", true);
    const recentDate = records.length === 0 ? "" : records[0].date;

    return {
      _id: archive._id,
      name: archive.name,
      index: archive.index,
      recentDate: recentDate,
      recordLength: records.length,
    };
  });
}

// 아카이브의 모든 정보 가져오기
export function getArchiveWithRecentDates(): ArchiveDataWithRecentDate[] {
  // 아카이브는 이름 순으로
  const archive = useQuery({
    type: Archive,
    query: (Archives) => {
      return Archives.sorted("index");
    },
  });

  return archive.map((archive) => {
    const records = archive.records.sorted("date", true).map((record) => {
      return {
        _id: record._id,
        date: record.date,
        imagePath: record.imagePath,
        body: record.body,
      };
    });
    const recentDate = records.length === 0 ? "" : records[0].date;

    return {
      _id: archive._id,
      name: archive.name,
      recentDate,
      recordLength: records.length,
      records: records,
    };
  });
}

// 아카이브 _id와 이름만 가져오기
export function getArchiveNameID() {
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
      _id: new Realm.BSON.ObjectId(),
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

// 아카이브의 가장 최근 레코드 날짜 가져오기
export function getRecentRecordDate({ _id }: { _id: Realm.BSON.ObjectId }) {
  const archive = useObject(Archive, _id);
  if (!archive) {
    return "";
  }

  const records = archive.records.sorted("date", true);
  if (records.length === 0) {
    return "";
  }

  return records[0].date;
}

// 아카이브 순서 변경
