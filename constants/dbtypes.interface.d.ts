export interface DBRecordType {
  _id: string;
  date: string;
  imagePath: string;
  body: string;
  archiveId: string;
}

export interface DBArchiveType {
  _id: string;
  name: string;
  lastDate: string | undefined;
  count: number;
}