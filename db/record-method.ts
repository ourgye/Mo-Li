import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecordType } from "@/constants/types.interface";
import { Mutex } from "async-mutex";

const recordMutex = new Mutex();

// 레코드 생성
const createRecord = async (record: RecordType) => {
  await recordMutex.runExclusive(async () => {
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
      const archive = await AsyncStorage.getItem(record.archiveId).then(
        (res) => (res ? JSON.parse(res) : null),
      );
      if (archive) {
        archive.count += 1;
        // set last date
        if (!archive.lastDate) {
          archive.lastDate = record.date;
        } else if (new Date(archive.lastDate) < new Date(record.date)) {
          archive.lastDate = record.date;
        }

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
  });
};

// 레코드 삭제
const deleteRecord = async (recordId: string, archiveId: string) => {
  await recordMutex.runExclusive(async () => {
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
  });
};

// 레코드 수정
const modifyRecord = async (record: RecordType) => {
  await recordMutex.runExclusive(async () => {
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
  });
};

// 아카이브로 레코드 조회
const getRecordByArchive = async (archiveId: string) => {
  return await recordMutex.runExclusive(async () => {
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
      const recordsWithNull = await Promise.all(
        records.map(
          async (id: string) =>
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
  });
};

// 모든 레코드 가져오기
const getAllRecords = async () => {
  return await recordMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION is not defined",
        );
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // Fetch list of archive IDs
      const archives = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
      ).then((res) => (res ? JSON.parse(res) : []));

      // Create an array of record collection keys based on each archive ID
      const recordsDBTables = archives.map(
        (archiveId: string) =>
          `${process.env.EXPO_PUBLIC_DB_RECORD_COLLECTION}_${archiveId}`,
      );

      // Fetch records for each archive key
      const recordsList = await Promise.all(
        recordsDBTables.map(async (tableKey: string) => {
          const recordIds = await AsyncStorage.getItem(tableKey).then((res) =>
            res ? JSON.parse(res) : [],
          );
          return recordIds;
        }),
      );

      // Fetch all records by record ID
      const records = await Promise.all(
        recordsList.flat().map(async (recordId: string) => {
          const record = await AsyncStorage.getItem(recordId).then((res) =>
            res ? JSON.parse(res) : null,
          );
          return record;
        }),
      );

      // Remove null values
      return records.filter((record) => record !== null);
    } catch (e) {
      console.error("[ERROR] error from getting all records", e);
      return [];
    }
  });
};

// 해당 아카이브 아이디로 모든 레코드 삭제
const deleteAllRecordsByArchive = async (archiveId: string) => {
  await recordMutex.runExclusive(async () => {
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
  });
};

export {
  createRecord,
  deleteRecord,
  modifyRecord,
  getRecordByArchive,
  getAllRecords,
  deleteAllRecordsByArchive,
};
