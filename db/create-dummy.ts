import Realm from "realm";
import Archive from "./schema/archive";
import Record from "./schema/record";
import { createNewArchive } from "./crud/archive-method";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const dummyArchives = [
  {
    name: "아카이브1",
    count: 0,
  },
  {
    name: "아카이브2",
    count: 0,
  },
  {
    name: "아카이브3",
    count: 0,
  },
];

// 원하는 사진 images는 dummyImages에 추가해서 사용해유
// 이름도 같이 바꿔줘야함
const dummyImages = [
  require("@/assets/images/dummy-images/beach.jpeg"),
  require("@/assets/images/dummy-images/gapo1.jpeg"),
  require("@/assets/images/dummy-images/gapo2.jpeg"),
  require("@/assets/images/dummy-images/joshua.jpeg"),
  require("@/assets/images/dummy-images/octopus.jpeg"),
];

const dummyRecords = [
  {
    date: new Date(),
    imagePath: [
      dummyImages[Math.floor(Math.random() * dummyImages.length)],
      dummyImages[Math.floor(Math.random() * dummyImages.length)],
    ],
    imageRatio: [Math.random() + 0.5, Math.random() + 0.5],
    body: "첫 번째 레코드, 사진 2개",
  },
  {
    date: new Date(),
    imagePath: [dummyImages[Math.floor(Math.random() * dummyImages.length)]],
    imageRatio: [Math.random() + 0.5],
    body: "두 번째 레코드",
  },
  {
    date: new Date(),
    imagePath: [dummyImages[Math.floor(Math.random() * dummyImages.length)]],
    imageRatio: [Math.random() + 0.5],
    body: "세 번째 레코드",
  },
  {
    date: new Date(),
    imagePath: [dummyImages[Math.floor(Math.random() * dummyImages.length)]],
    imageRatio: [Math.random() + 0.5],
    body: "네 번째 레코드",
  },
];

const saveDummyImageToDocument = async (
  imagePath: string,
  imageIndex: number,
  recordIndex: number,
): Promise<string> => {
  try {
    const asset = await Asset.loadAsync(imagePath);
    const fileUri = `${FileSystem.documentDirectory}-dummy-image-${recordIndex}-${imageIndex}.jpg`;

    await FileSystem.copyAsync({
      from: asset[0].localUri || asset[0].uri,
      to: fileUri,
    });

    return fileUri;
  } catch (error) {
    console.error("Error saving dummy images:", error);
    throw error;
  }
};

const createDummyData = (realm: Realm) => {
  // check if the database is empty
  console.log("Realm file path: ", realm.path);
  console.log("Realm schema version: ", realm.schemaVersion);
  const archives = realm.objects("Archive");
  const records = realm.objects("Record");

  if (archives.length > 0 && records.length > 0) {
    return;
  }

  if (!archives || archives.length === 0) {
    dummyArchives.forEach((archive) => {
      createNewArchive(realm, archive.name);
    });
  }

  if (!records || records.length === 0) {
    try {
      const archive = realm.objects<Archive>("Archive")[0];
      dummyRecords.forEach(async (record, index) => {
        const imagePathArray = await Promise.all(
          record.imagePath.map(async (path, i) => {
            return await saveDummyImageToDocument(path, i, index);
          }),
        );
        try {
          realm.write(() => {
            const newRecord = realm.create<Record>(
              "Record",
              Record.generate(
                record.date,
                imagePathArray,
                record.imageRatio,
                record.body,
              ),
            );
            archive.records.push(newRecord);
            archive.count += 1;
            archive.lastDate = archive.lastDate
              ? new Date(
                  Math.max(archive.lastDate.getTime(), record.date.getTime()),
                )
              : record.date;
          });
        } catch (error) {
          console.error("Error creating record:", error);
          throw error;
        }
      });
    } catch (error) {
      console.error("Error creating dummy data:", error);
    }
  }

  console.log("Dummy data created");
  console.log("Archives: ", realm.objects("Archive"));
  console.log("Records: ", realm.objects("Record"));
};

export default createDummyData;
