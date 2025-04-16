import Realm from "realm";
import Archive from "./schema/archive";
import Record from "./schema/record";
import { createNewArchive } from "./crud/archive-method";

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

const dummyRecords = [
  {
    date: new Date(),
    imagePath: ["@/assets/images/dummy-images/beach.jpeg"],
    imageRatio: [1.5],
    body: "첫 번째 레코드",
  },
  {
    date: new Date(),
    imagePath: ["@/assets/images/dummy-images/gapo1.jpeg"],
    imageRatio: [1.5],
    body: "두 번째 레코드",
  },
  {
    date: new Date(),
    imagePath: ["@/assets/images/dummy-images/gapo2.jpeg"],
    imageRatio: [1.5],
    body: "세 번째 레코드",
  },
  {
    date: new Date(),
    imagePath: ["@/assets/images/dummy-images/joshua.jpeg"],
    imageRatio: [1.5],
    body: "네 번째 레코드",
  },
];

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
    realm.write(() => {
      const archive = realm.objects<Archive>("Archive")[0];
      dummyRecords.forEach((record) => {
        const newRecord = realm.create<Record>(
          "Record",
          Record.generate(
            record.date,
            record.imagePath,
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
    });
  }

  console.log("Dummy data created");
  console.log("Archives: ", realm.objects("Archive"));
  console.log("Records: ", realm.objects("Record"));
};

export default createDummyData;
