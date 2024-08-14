export interface RecordData{
    _id: Realm.BSON.ObjectId;
    date: string;
    imagePath: string;
    body: string;
    archive: Archive;
}

export interface RecordDataWOID{
    date: string;
    imagePath: string;
    body: string;
    archive: Archive;
}

export interface ArchiveData{
    _id: Realm.BSON.ObjectId;
    name: string;
}

export interface ArchiveDataWOID{
    name: string;
}

export interface ArchiveDataAll{
    _id: Realm.BSON.ObjectId;
    name: string;
    records: RecordData[];
}