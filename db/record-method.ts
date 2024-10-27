import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecordType } from "@/constants/types.interface";

// 레코드 생성
const createRecord = async (record: RecordType) => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );

    // record archive key value
    const REC_ARC_KEY =
      process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + record.archiveId;

    // fetch list of records
    const records: string[] = await AsyncStorage.getItem(REC_ARC_KEY).then(
      (res) => (res ? JSON.parse(res) : []),
    );

    // add new record
    records.push(record._id);

    // increase count to archive
    const archive = await AsyncStorage.getItem(record.archiveId).then((res) =>
      res ? JSON.parse(res) : null,
    );
    if (archive) {
      archive.count += 1;
      await AsyncStorage.setItem(record.archiveId, JSON.stringify(archive));
    } else {
      throw Error("archive not found");
    }

    // save new record list
    await AsyncStorage.setItem(REC_ARC_KEY, JSON.stringify(records));

    // save new record
    await AsyncStorage.setItem(record._id, JSON.stringify(record));
  } catch (e) {
    console.error("[ERROR] error from creating new record", e);
  }
};

// 레코드 삭제
const deleteRecord = async (recordId: string, archiveId: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );

    // record archive key value
    const REC_ARC_KEY =
      process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + archiveId;

    // fetch list of records
    const records = await AsyncStorage.getItem(REC_ARC_KEY).then((res) =>
      res ? JSON.parse(res) : [],
    );

    // remove record from list
    const newRecords = records.filter((id: string) => id !== recordId);

    // decrease count to archive
    const archive = await AsyncStorage.getItem(archiveId).then((res) =>
      res ? JSON.parse(res) : null,
    );
    if (archive) {
      archive.count += 1;
      await AsyncStorage.setItem(archiveId, JSON.stringify(archive));
    } else {
      throw Error("archive not found");
    }

    // save new record list
    await AsyncStorage.setItem(REC_ARC_KEY, JSON.stringify(newRecords));

    // delete record
    await AsyncStorage.removeItem(recordId);
  } catch (e) {
    console.error("[ERROR] error from deleting record", e);
  }
};

// 레코드 수정
const modifyRecord = async (record: RecordType) => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );

    // record archive key value
    const REC_ARC_KEY =
      process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + record.archiveId;

    // fetch list of records
    const records = await AsyncStorage.getItem(REC_ARC_KEY).then((res) =>
      res ? JSON.parse(res) : [],
    );

    // find record index
    const idx = records.findIndex((id: string) => id === record._id);

    // replace record
    records[idx] = record._id;

    // save new record list
    await AsyncStorage.setItem(REC_ARC_KEY, JSON.stringify(records));

    // save new record
    await AsyncStorage.setItem(record._id, JSON.stringify(record));
  } catch (e) {
    console.error("[ERROR] error from modifying record", e);
  }
};

// 아카이브로 레코드 조회
const getRecordByArchive = async (archiveId: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );

    // record archive key value
    const REC_ARC_KEY =
      process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + archiveId;

    // fetch list of records
    const records = await AsyncStorage.getItem(REC_ARC_KEY).then((res) =>
      res ? JSON.parse(res) : [],
    );

    // fetch all records
    const recordsWithNull = records.map(async (id: string) =>
      Promise.all(
        await AsyncStorage.getItem(id).then((res) =>
          res ? JSON.parse(res) : null,
        ),
      ),
    );

    // remove null values
    return recordsWithNull.filter(
      (record: RecordType | null) => record !== null,
    );
  } catch (e) {
    console.error("[ERROR] error from getting records by archive", e);
  }
};

// 모든 레코드 가져오기
const getAllRecords = async () => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );
    if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
      );

    // fetch list of archive
    const archives = await AsyncStorage.getItem(
      process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
    ).then((res) => (res ? JSON.parse(res) : []));

    const recordsDBTables = archives.map(
      (archiveId: string) =>
        process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + archiveId,
    );

    // fetch list of records
    const recordsList = recordsDBTables.map(
      async (tablekey: string) =>
        await Promise.all(
          await AsyncStorage.getItem(tablekey).then((res) =>
            res ? JSON.parse(res) : [],
          ),
        ),
    );

    // fetch all records
    const records = recordsList.map(
      async (id: string[]) =>
        await Promise.all(
          id.map(
            async (recordId: string) =>
              await AsyncStorage.getItem(recordId).then((res) =>
                res ? JSON.parse(res) : null,
              ),
          ),
        ),
    );

    // remove null values
    return records.filter((record: RecordType | null) => record !== null);
  } catch (e) {
    console.error("[ERROR] error from getting all records", e);
  }
};

// 해당 아카이브 아이디로 모든 레코드 삭제
const deleteAllRecordsByArchive = async (archiveId: string) => {
  try {
    if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
      throw new Error(
        "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
      );

    // record archive key value
    const REC_ARC_KEY =
      process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION + "_" + archiveId;

    // fetch list of records
    const records = await AsyncStorage.getItem(REC_ARC_KEY).then((res) =>
      res ? JSON.parse(res) : [],
    );

    // remove all records
    records.forEach(async (recordId: string) => {
      await AsyncStorage.removeItem(recordId);
    });

    // remove record list
    await AsyncStorage.removeItem(REC_ARC_KEY);
  } catch (e) {
    console.error("[ERROR] error from deleting all records by archive", e);
  }
};

export {
  createRecord,
  deleteRecord,
  modifyRecord,
  getRecordByArchive,
  getAllRecords,
  deleteAllRecordsByArchive,
}