import { RecordDataWOID, RecordData, ArchiveData } from "@/constants/types.interface";
import { useObject, useQuery, useRealm } from "@realm/react";
import { Record, Archive } from "./entities";

// 레코드 생성
export function createRecord({
  date,
  imagePath,
  body,
  archive,
}: RecordDataWOID) {
  const realm = useRealm();
  const id = new Realm.BSON.ObjectID();

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

// 아카이브로 레코드 조회
export function getRecordByArchive(archive: ArchiveData | undefined) {
  if (!archive) return getAllRecords();
  const records = useQuery({
    type: Record,
    query: (Records) => {
      return Records.filtered(`archive._id = $0`, archive._id);
    },
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

export function getRecordByDate(date: Date) {
  const formattedDate = date.toISOString().split("T")[0];
  const records = getAllRecords();

  return records.filter((record) => record.date === formattedDate);
}

// 아카이브와 날짜로 레코드 조회
export function getRecordByArchiveDate(
  archiveId: Realm.BSON.ObjectId | undefined,
  date: Date
): Record[] {
  if (!archiveId) return getRecordByDate(date);

  const formattedDate = date.toISOString().split("T")[0];
  const records = useQuery(Record, (Records) => {
    return Records.filtered(
      `archive._id = $0 AND date = $1`,
      archiveId,
      date.toISOString().split("T")[0]
    );
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

// 모든 레코드 가져오기
export function getAllRecords() {
  const records = useQuery(Record, (Records) => {
    return Records; // 모든 레코드
  });

  return Array.from(records);
}
