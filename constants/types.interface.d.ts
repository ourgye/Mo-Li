import { Href } from "expo-router";

export interface RecordType {
  _id: string;
  date: string;
  imagePath: string;
  imageRatio: number; // height / width
  body: string;
  archiveId: string;
}

export interface ArchiveType {
  _id: string;
  name: string;
  lastDate: string | undefined;
  count: number;
}

export interface MyPageListType {
  _id: number;
  name: string;
  path: Href;
}
