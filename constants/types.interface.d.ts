export interface RecordType {
  _id: string;
  date: string;
  imagePath: string;
  body: string;
  archiveId: string;
  archiveName: string;
}

export interface ArchiveType {
  _id: string;
  name: string;
  lastDate: string | undefined;
  count: number;
}
