import { ImagePickerResult } from "expo-image-picker";
import { index } from "realm";

export interface RecordData {
  _id: Realm.BSON.ObjectId;
  date: string;
  imagePath: string;
  body: string;
  archive: ArchiveData;
}

export interface RecordDataWOID {
  date: string;
  imagePath: string;
  body: string;
  archive: ArchiveData | undefined;
}

export interface RecordDataWOArchive {
  _id: Realm.BSON.ObjectId;
  date: string;
  imagePath: string;
  body: string;
}

export interface RecordDataToSave {
  date: string;
  image: undefined | ImagePickerResult;
  body: string;
  archive: undefined | ArchiveData;
}
export interface ArchiveData {
  _id: Realm.BSON.ObjectId;
  index: number;
  name: string;
}

export interface ArchiveDataWOID {
  index: number;
  name: string;
}

export interface ArchiveDataAll {
  _id: Realm.BSON.ObjectId;
  index: number;
  name: string;
  records: RecordData[];
}

export interface OrderData {
  _id: number;
  order: string;
}

export interface MyPageListData {
  _id: number;
  name: string;
  path: string;
}

export interface ArchiveDataWithRecentDate {
  _id: Realm.BSON.ObjectId;
  name: string;
  recentDate: string;
  recordLength: number;
  records: RecordDataWOArchive[];
}

export interface ArchiveDataWithRecentDateWORecords {
  _id: Realm.BSON.ObjectId;
  name: string;
  recentDate: string;
  recordLength: number;
}
