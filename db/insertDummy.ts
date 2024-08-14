import { ArchiveDataWOID, RecordDataWOID } from "@/constants/types.interface";
import { createArchive, getAllArchives } from "./archive-method";
import { createRecord } from "./record-method";
import { useRealm } from "@realm/react";

// 코파일럿 채고~!
export function insertDummy() {
  const realm = useRealm();
  realm.write(() => realm.deleteAll());

  const archives: ArchiveDataWOID[] = [
    { name: "archive1" },
    { name: "archive2" },
    { name: "archive3" },
  ];

  
  archives.forEach((archive) => {
    createArchive(archive);
  });

  const archivesAll = getAllArchives();
  console.log(archivesAll);

  const records: RecordDataWOID[] = [
    {
      date: new Date('2024-08-10').toISOString().split("T")[0],
      imagePath: "https://picsum.photos/600/400",
      body: "body1",
      archive: archivesAll[0],
    },
    {
      date: new Date().toISOString().split("T")[0],
      imagePath: "https://picsum.photos/600/400",
      body: "body2",
      archive: archivesAll[1],
    },
    {
      date: new Date().toISOString().split("T")[0],
      imagePath: "https://picsum.photos/600/400",
      body: "body3",
      archive: archivesAll[2],
    },
  ];

  records.forEach((record) => {
    createRecord(record);
  });
}
