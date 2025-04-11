import Realm from "realm";
import { useEffect, useMemo, useState } from "react";

import { getAllRecordsByArchive } from "@/db/crud/record-method";
import Record from "@/db/schema/record";
import { useQuery } from "@realm/react";

const useRecordArchiveFiltered = (
  realm: Realm,
  archiveId: Realm.BSON.UUID,
  order: "desc" | "asc",
) => {
  const allRecords = useQuery(Record);

  const filteredAndSorted = useMemo(() => {
    const filtered = allRecords.filtered("archive._id == $0", archiveId);
    if (order === "desc") {
      return filtered.sorted("date", true); // 내림차순
    } else {
      return filtered.sorted("date", false); // 오름차순
    }
  }, [allRecords, archiveId, order]);

  return filteredAndSorted;
};

export { useRecordArchiveFiltered };
