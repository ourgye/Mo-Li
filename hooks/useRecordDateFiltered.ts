import Realm from "realm";
import { useEffect, useState } from "react";

import {
  getAllRecordsByDate,
  getAllRecordsByArchiveAndDate,
} from "@/db/crud/record-method";
import Record from "@/db/schema/record";

const useRecordDateFiltered = (
  realm: Realm,
  date: Date,
  archiveId?: Realm.BSON.UUID,
) => {
  const [records, setRecords] = useState<Realm.Results<Record>>();

  useEffect(() => {
    if (archiveId) {
      const records = getAllRecordsByArchiveAndDate(realm, archiveId, date);
      setRecords(records);
    } else {
      const records = getAllRecordsByDate(realm, date);
      setRecords(records);
    }

    const listener = (
      newObjects: Realm.OrderedCollection<
        Realm.Object<Record, never> & Record,
        [number, Realm.Object<Record, never> & Record]
      >,
    ) => {
      setRecords(newObjects as Realm.Results<Record>);
    };
    records?.addListener(listener);
    return () => {
      records?.removeListener(listener);
    };
  }, [realm, date, archiveId]);

  return records;
};

export { useRecordDateFiltered };
