import { useEffect, useState } from "react";
import { getAllArchives, createArchive } from "@/db/archive-method"; // Ensure this import is correct
import { ArchiveType } from "@/constants/types.interface";
import { nanoid } from "nanoid";

export function useArchiveList() {
  const [archiveList, setArchiveList] = useState<ArchiveType[]>([]);

  const fetchArchiveList = async () => {
    const res = await getAllArchives();
    if (res) {
      setArchiveList(res);
    }
  };

  const createNewArchive = async (archiveName: string) => {
    // Create a new archive
    try {
      const archive: ArchiveType = {
        _id: nanoid(),
        name: archiveName,
        lastDate: undefined,
        count: 0,
      };
      await createArchive(archive);
    } catch (e) {
      console.error("[ERROR] error from creating new archive", e);
    }
  };

  // Fetch archives when the component mounts
  useEffect(() => {
    fetchArchiveList();
  }, []);

  // This function can be called to refresh the archive list
  const refreshArchiveList = () => {
    fetchArchiveList();
  };

  return { archiveList, refreshArchiveList, createNewArchive };
}
