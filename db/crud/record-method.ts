import Realm from "realm";
import { useRealm, useQuery } from "@realm/react";
import Record from "../schema/record";
import Archive from "../schema/archive";

// creaete new record
const createNewRecord = (realm: Realm, record: Record, archive: Archive) => {
  try {
    realm.write(() => {
      const archiveObj = realm.objectForPrimaryKey<Archive>(
        "Archive",
        archive._id,
      );
      if (!archiveObj) {
        throw new Error("Archive not found");
      }
      const newRec = realm.create("Record", record);
      archiveObj.records.push(newRec);
    });
  } catch (error) {
    console.error("[ERROR] error from creating new record", error);
    alert(`레코드를 생성하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// delete new record by id
const deleteRecord = (
  realm: Realm,
  recordId: Realm.BSON.UUID,
  archiveId: Realm.BSON.UUID,
) => {
  try {
    realm.write(() => {
      const record = realm.objectForPrimaryKey<Record>("Record", recordId);
      const archive = realm.objectForPrimaryKey<Archive>("Archive", archiveId);
      if (record && archive) {
        realm.delete(record);
        archive.count -= 1;
        archive.lastDate = (archive.records?.max("date") as Date) || undefined;
      } else {
        throw new Error("Record not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from deleting new record", error);
    alert(`레코드를 삭제하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// update new record
const updateRecord = (
  realm: Realm,
  id: Realm.BSON.UUID,
  date: Date,
  imagePath: string,
  imageRatio: number,
  body: string,
) => {
  try {
    realm.write(() => {
      const record = realm.objectForPrimaryKey("Record", id);
      if (record) {
        record.date = date;
        record.imagePath = imagePath;
        record.imageRatio = imageRatio;
        record.body = body;
      } else {
        throw new Error("Record not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from updating new record", error);
    alert(`레코드를 수정하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get record by id
const getRecordById = (realm: Realm, recordId: Realm.BSON.UUID) => {
  try {
    const record = realm.objectForPrimaryKey<Record>("Record", recordId);
    return record;
  } catch (error) {
    console.error("[ERROR] error from getting record by id", error);
    alert(`레코드를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get all records
const getAllRecords = (realm: Realm) => {
  try {
    const records = realm.objects("Record").sorted("date", true);
    return records;
  } catch (error) {
    console.error("[ERROR] error from getting all records", error);
    alert(`레코드를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get all records by archive
const getAllRecordsByArchive = (
  realm: Realm,
  archiveId: Realm.BSON.UUID,
  dateOrder: "desc" | "asc",
) => {
  try {
    const records = realm
      .objects<Record>("Record")
      .filtered(`archive._id == $0`, archiveId)
      .sorted("date", dateOrder === "desc" ? true : false);
    return records;
  } catch (error) {
    console.error("[ERROR] error from getting all records", error);
    alert(`레코드를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get all records by date
const getAllRecordsByDate = (realm: Realm, date: Date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const records = realm
      .objects<Record>("Record")
      .filtered("date >= $0 && date <= $1", startOfDay, endOfDay);
    return records;
  } catch (error) {
    console.error("[ERROR] error from getting all records", error);
    alert(`레코드를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get all records by archive and date
const getAllRecordsByArchiveAndDate = (
  realm: Realm,
  archiveId: Realm.BSON.UUID,
  date: Date,
) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const records = realm
      .objects<Record>("Record")
      .filtered(
        `archive._id == $0 && date >= $1 && date <= $2`,
        archiveId,
        startOfDay,
        endOfDay,
      );
    return records;
  } catch (error) {
    console.error("[ERROR] error from getting all records", error);
    alert(`레코드를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

export {
  createNewRecord,
  deleteRecord,
  updateRecord,
  getRecordById,
  getAllRecords,
  getAllRecordsByArchive,
  getAllRecordsByDate,
  getAllRecordsByArchiveAndDate,
};
