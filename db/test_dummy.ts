import { ArchiveType, RecordType } from "@/constants/types.interface";
import { nanoid } from "nanoid";
import { createArchive, getAllArchives } from "./archive-method";
import { createRecord, getAllRecords } from "./record-method";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const randomImagePathList = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/300",
  "https://picsum.photos/230/200",
  "https://picsum.photos/200/400",
  "https://picsum.photos/1600/900",
  "https://picsum.photos/900/1600",
  "https://picsum.photos/300/400",
];

const randomImageRatioList = [
  3 / 2,
  1,
  200 / 230,
  400 / 200,
  9 / 16,
  16 / 9,
  4 / 3,
];

function randomDate(start: dayjs.Dayjs, end: dayjs.Dayjs) {
  const diff = end.diff(start);
  return start.add(Math.random() * diff, "millisecond");
}

const testCreateArchiveDummy = () => {
  try {
    const archives: ArchiveType[] = [
      {
        _id: nanoid(),
        name: "아카이브1",
        count: 0,
        lastDate: undefined,
      },
      {
        _id: nanoid(),
        count: 0,
        name: "아카이브2",
        lastDate: undefined,
      },
      {
        _id: nanoid(),
        count: 0,
        name: "아카이브3",
        lastDate: undefined,
      },
    ];

    archives.map(async (archive: ArchiveType) => {
      console.log("Creating archive", archive);
      await createArchive(archive);
      console.log("Created archive", archive);
    });
  } catch (e) {
    console.error("[ERROR] error from creating new archive", e);
  }
};

const testCreateRecordDummy = async () => {
  try {
    const archives = await getAllArchives();
    const records: RecordType[] = Array.from({ length: 10 }, (_, i) => {
      const randomArchiveIndex = Math.floor(Math.random() * archives.length);
      const r_i = Math.floor(Math.random() * randomImagePathList.length);
      return {
        _id: nanoid(),
        archiveId: archives[randomArchiveIndex]._id,
        archiveName: archives[randomArchiveIndex].name,
        imagePath: randomImagePathList[r_i],
        date: randomDate(dayjs().add(-3, "day"), dayjs()).format(
          "YYYY-MM-DDTHH:mm:ss",
        ),
        body: `레코드${i} 내용`,
        imageRatio: randomImageRatioList[r_i],
      };
    });

    records.map(async (record) => {
      console.log("Creating record", record);
      await createRecord(record);
      console.log("Created record", record);
    });
  } catch (e) {
    console.error("[ERROR] error from creating new record", e);
  }
};

const checkDummyNeeded = async () => {
  // clear all archives
  //   await AsyncStorage.clear();
  const archives = await getAllArchives();
  const records = await getAllRecords();
  if (!archives || archives.length === 0) {
    testCreateArchiveDummy();
  } else {
    // console.log("show archives", archives);
  }
  if (!records || records.length === 0) {
    testCreateRecordDummy();
  } else {
    // console.log("show records", records);
  }
};

const clearAllData = async () => {
  await AsyncStorage.clear();
};

export { checkDummyNeeded, clearAllData };
