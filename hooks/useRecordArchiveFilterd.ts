import Realm from "realm";
import { useEffect, useMemo, useState } from "react";

import Record from "@/db/schema/record";
import { useQuery } from "@realm/react";

const useRecordArchiveFiltered = (
  realm: Realm,
  archiveId: Realm.BSON.UUID | string | undefined,
  order?: "desc" | "asc",
) => {
  const allRecords = useQuery(Record);

  const filteredAndSorted = useMemo(() => {
    if (!archiveId || archiveId === "VIEW_ALL") {
      return allRecords;
    }
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
