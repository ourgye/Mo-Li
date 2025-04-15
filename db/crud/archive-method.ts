import { useRealm } from "@realm/react";
import Realm from "realm";
import Archive from "../schema/archive";

// create new archive
const createNewArchive = (realm: Realm, name: string) => {
  try {
    const maxOrder = (realm.objects("Archive").max("order") as number) ?? -1;

    realm.write(() => {
      realm.create("Archive", Archive.generate(name, maxOrder + 1));
    });
  } catch (error) {
    console.error("[ERROR] error from creating new archive", error);
    alert(`아카이브를 생성하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// delete an archive by id
const deleteArchive = (realm: Realm, archiveId: Realm.BSON.UUID) => {
  try {
    realm.write(() => {
      const archive = realm.objectForPrimaryKey<Archive>("Archive", archiveId);
      if (archive) {
        realm.delete(archive.records);
        realm.delete(archive);
      } else {
        throw new Error("Archive not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from deleting archive", error);
    alert(`아카이브를 삭제하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// update an archive by id
const updateArchive = (realm: Realm, id: Realm.BSON.UUID, name: string) => {
  try {
    realm.write(() => {
      const archive = realm.objectForPrimaryKey<Archive>("Archive", id);
      if (archive) {
        archive.name = name;
      } else {
        throw new Error("Archive not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from updating archive", error);
    alert(`아카이브를 수정하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// update count of archive by 1
const updateArchiveCount = (realm: Realm, id: Realm.BSON.UUID) => {
  try {
    realm.write(() => {
      const archive = realm.objectForPrimaryKey<Archive>("Archive", id);
      if (archive) {
        archive.count = archive.count + 1;
      } else {
        throw new Error("Archive not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from updating archive count", error);
    alert(
      `아카이브 카운트를 수정하는데 에러가 발생했습니다. \n에러 내용: ${error}`,
    );
  }
};

// get all archives
const getAllArchives = (realm: Realm) => {
  try {
    const archives = realm.objects<Archive>("Archive").sorted("order", true);
    return archives;
  } catch (error) {
    console.error("[ERROR] error from getting all archives", error);
    alert(`아카이브를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

// get archive by id
const getArchiveById = (realm: Realm, archiveId: Realm.BSON.UUID) => {
  try {
    const archive = realm.objectForPrimaryKey<Archive>("Archive", archiveId);
    return archive;
  } catch (error) {
    console.error("[ERROR] error from getting archive by id", error);
    alert(`아카이브를 가져오는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

const reorderArchives = (realm: Realm, archives: Archive[]) => {
  try {
    realm.write(() => {
      const length = archives.length;
      archives.forEach((archive: Archive, index: number) => {
        archive.order = length - index - 1;
      });
    });
  } catch (error) {
    console.error("[ERROR] error from reordering archives", error);
    alert(`아카이브를 재정렬하는데 에러가 발생했습니다. \n에러 내용: ${error}`);
  }
};

const updateArchiveLastDate = (realm: Realm, archiveId: Realm.BSON.UUID) => {
  try {
    realm.write(() => {
      const archive = realm.objectForPrimaryKey<Archive>("Archive", archiveId);
      if (archive) {
        archive.lastDate = (archive.records?.max("date") as Date) || undefined;
      } else {
        throw new Error("Archive not found");
      }
    });
  } catch (error) {
    console.error("[ERROR] error from updating archive last date", error);
    alert(
      `아카이브 마지막 날짜를 수정하는데 에러가 발생했습니다. \n에러 내용: ${error}`,
    );
  }
};
export {
  createNewArchive,
  deleteArchive,
  updateArchive,
  updateArchiveCount,
  updateArchiveLastDate,
  reorderArchives,
  getAllArchives,
  getArchiveById,
};
