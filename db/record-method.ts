import { RecordDataWOID, RecordData } from "@/constants/types.interface";
import { useObject, useQuery, useRealm } from "@realm/react";
import ObjectID from "bson-objectid";
import { Record, Archive } from "./entities";

// 레코드 생성
export function createRecord({
  date,
  imagePath,
  body,
  archive,
}: RecordDataWOID) {
  const realm = useRealm();
  const id = ObjectID();

  realm.write(() => {
    realm.create("Record", {
      _id: id,
      date,
      imagePath,
      body,
      archive,
    });
  });
}

// 레코드 수정
export function updateRecord({
  _id,
  date,
  imagePath,
  body,
  archive,
}: RecordData) {
  const realm = useRealm();
  const currRecord = useObject(Record, _id);

  realm.write(() => {
    if (currRecord) {
      currRecord.date = date;
      currRecord.imagePath = imagePath;
      currRecord.body = body;
      currRecord.archive = archive;
    }
  });
}

// 날짜로 레코드 조회
export function getRecordByDate(date: Date) {
  const records = useQuery(Record, (Records) => {
    return Records.filtered(`date = $0`, date);
  });

  return Array.from(records);
}

// 아카이브로 레코드 조회
export function getRecordByArchive(archive: Archive) {
  const records = useQuery(Record, (Records) => {
    return Records.filtered(`archive = $0`, archive);
  });

  return records;
}

// 아카이브 아이디로 레코드 조회
export function getRecordByArchiveId(archiveId: Realm.BSON.ObjectId) {
  const records = useQuery(Record, (Records) => {
    return Records.filtered(`archive._id = $0`, archiveId);
  });

  return Array.from(records);
}

// 아카이브와 날짜로 레코드 조회
export function getRecordByArchiveDate(archive: Archive, date: Date): Record[] {
  const records = useQuery(Record, (Records) => {
    return Records.filtered(`archive = $0 AND date = $1`, archive, date);
  });

  return Array.from(records);
}

// 레코드 삭제
export function deleteRecord(_id: Realm.BSON.ObjectId) {
  const realm = useRealm();
  const currRecord = useObject(Record, _id);

  realm.write(() => {
    if (currRecord) {
      realm.delete(currRecord);
    }
  });
}
