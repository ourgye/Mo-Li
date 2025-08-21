import * as FileSystem from "expo-file-system";
import Realm from "realm";
import Archive from "./schema/archive";
import Record from "./schema/record";

import { Asset } from "expo-asset";

const howManyRecord: number = 200;

const dummyImages = [
  require("@/assets/images/dummy-images/image-1.jpeg"),
  require("@/assets/images/dummy-images/image-2.jpeg"),
  require("@/assets/images/dummy-images/image-3.jpeg"),
  require("@/assets/images/dummy-images/image-4.jpeg"),
];

const saveDummyImageToDocuments = async (): Promise<string[]> => {
  try {
    const assets = await Asset.loadAsync(dummyImages);

    const imagePathArray = await Promise.all(
      assets.map(async (asset, i) => {
        const fileUri = `${FileSystem.documentDirectory}-dummy-image-${i}.jpg`;

        await FileSystem.copyAsync({
          from: asset.localUri || asset.uri,
          to: fileUri,
        });

        return fileUri;
      }),
    );

    return imagePathArray;
  } catch (error) {
    console.error("Error saving dummy images:", error);
    throw error;
  }
};

const createHugeData = async (realm: Realm) => {
  const archives = realm.objects("Archive");

  if (!archives || archives.length === 0) {
    realm.write(() => {
      realm.create("Archive", Archive.generate("default", 1));
    });
  }

  const archive = realm.objects<Archive>("Archive")[0];
  // check if there are any records
  if (archive.records && archive.records.length >= howManyRecord) {
    console.log("Already created huge data");
    return;
  }

  const imagePathArray = await saveDummyImageToDocuments();
  const data: Record[] = [];

  try {
    for (let i = 0; i < howManyRecord; i++) {
      const randomRatio = Math.random() + 0.5;
      const randomIndex = Math.floor(Math.random() * imagePathArray.length);
      const record = Record.generate(
        // date + random
        new Date(Date.now() + Math.random() * 10000000000),
        [imagePathArray[randomIndex]],
        [randomRatio],
        `레코드 ${i}`,
      ) as Record;
      data.push(record);
    }

    realm.write(() => {
      data.forEach((record) => {
        const newRecord = realm.create("Record", record);
        archive.records.push(newRecord);
        archive.count += 1;
        archive.lastDate = archive.lastDate
          ? new Date(
              Math.max(archive.lastDate.getTime(), record.date.getTime()),
            )
          : record.date;
      });
    });
  } catch (error) {
    console.error("Error creating huge data:", error);
    throw error;
  }
  console.log("Huge data created");
};

const deleteAllData = (realm: Realm) => {
  realm.write(() => {
    const allRecords = realm.objects("Record");
    const allArchives = realm.objects("Archive");
    realm.delete(allRecords);
    realm.delete(allArchives);
  });
  console.log("All data deleted");
};

export { createHugeData, deleteAllData };
