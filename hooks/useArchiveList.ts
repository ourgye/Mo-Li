import { useEffect, useState } from "react";
import { getAllArchives } from "@/db/archive-method"; // Ensure this import is correct
import { ArchiveType } from "@/constants/types.interface";

export function useArchiveList() {
  const [archiveList, setArchiveList] = useState<ArchiveType[]>([]);

  const fetchArchiveList = async () => {
    const res = await getAllArchives();
    if (res) {
      setArchiveList(res);
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

  return { archiveList, refreshArchiveList };
}
