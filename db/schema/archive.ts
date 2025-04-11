import Realm, { ObjectSchema } from "realm";
import Record from "./record";

class Archive extends Realm.Object<Archive> {
  _id!: Realm.BSON.UUID | string;
  name!: string;
  lastDate?: Date;
  count: number = 0;
  order!: number;
  show: boolean = true;
  records: Realm.List<Record> = new Realm.List<Record>();

  static generate(name: string, order: number) {
    return {
      _id: new Realm.BSON.UUID(),
      name,
      order,
      count: 0,
      show: true,
      lastDate: undefined,
    };
  }

  static generateDummyAll() {
    return {
      _id: "VIEW_ALL",
      name: "전체",
      order: 0,
      count: 0,
      show: true,
      lastDate: undefined,
    };
  }

  static schema: ObjectSchema = {
    name: "Archive",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      name: "string",
      lastDate: "date?", // optional
      count: "int",
      order: "int",
      show: "bool",
      records: "Record[]", // list of Record objects
    },
  };
}

export default Archive;
