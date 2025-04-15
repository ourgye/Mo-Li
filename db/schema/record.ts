import Realm, { ObjectSchema } from "realm";
import Archive from "./archive";

class Record extends Realm.Object<Record> {
  _id!: Realm.BSON.UUID;
  date!: Date;
  imagePath!: string[];
  imageRatio!: number[]; // height / width
  body!: string;
  archive!: Realm.List<Archive>; // LinkingObjects<Archive>;

  static generate(
    date: Date,
    imagePath: string[],
    imageRatio: number[],
    body: string,
  ) {
    return {
      _id: new Realm.BSON.UUID(),
      date,
      imagePath,
      imageRatio,
      body,
    };
  }

  static schema: ObjectSchema = {
    name: "Record",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      date: "date",
      imagePath: "string[]",
      imageRatio: "float[]",
      body: "string",
      archive: {
        type: "linkingObjects",
        objectType: "Archive",
        property: "records", // the property name in Archive that links to Record
      },
    },
  };
}

export default Record;
