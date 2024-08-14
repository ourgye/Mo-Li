import Realm, { ObjectSchema } from "realm";

export class Record extends Realm.Object<Record> {
  _id!: Realm.BSON.ObjectId;
  date!: string;
  imagePath!: string;
  body!: string;
  archive!: Archive; 

  static schema: ObjectSchema = {
    name: "Record",
    properties: {
      _id: "objectId",
      date: "string",
      imagePath: "string",
      body: "string",
      archive: "Archive",
    },
    primaryKey: "_id",
  };
}

export class Archive extends Realm.Object<Archive> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  // total: number = 0;
  // recent!: Date;
  records!: Realm.List<Record>;

  static schema: ObjectSchema = {
    name: "Archive",
    properties: {
        _id: "objectId",
      name: "string",
      records: {
        type: "linkingObjects",
        objectType: "Record",
        property: "archive",
      }
    },
    primaryKey: "_id",
  };
}
