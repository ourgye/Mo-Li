import { Mutex } from "async-mutex";
import type { ArchiveType } from "@/constants/types.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mutex 생성
const archiveMutex = new Mutex();

// 아카이브 생성
const createArchive = async (archive: ArchiveType) => {
  await archiveMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // fetch list of archives
      const archives: string[] = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
      ).then((res) => (res ? JSON.parse(res) : []));

      // add new archive
      archives.push(archive._id);

      // save new archive list
      await AsyncStorage.setItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
        JSON.stringify(archives),
      );

      // save new archive
      await AsyncStorage.setItem(archive._id, JSON.stringify(archive));
    } catch (e) {
      console.error("[ERROR] error from creating new archive", e);
    }
  });
};

// 아카이브 삭제
const deleteArchive = async (archiveId: string) => {
  await archiveMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // fetch list of archives
      const archives = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
      ).then((res) => (res ? JSON.parse(res) : []));

      // remove archive from list
      const newArchives = archives.filter((id: string) => id !== archiveId);

      // save new archive list
      await AsyncStorage.setItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
        JSON.stringify(newArchives),
      );

      // delete archive
      await AsyncStorage.removeItem(archiveId);
    } catch (e) {
      console.error("[ERROR] error from deleting archive", e);
    }
  });
};

// 아카이브 수정
const modifyArchive = async (archive: ArchiveType) => {
  await archiveMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // modify archive
      await AsyncStorage.setItem(archive._id, JSON.stringify(archive));
    } catch (e) {
      console.error("[ERROR] error from modifying archive", e);
    }
  });
};

// 모든 아카이브 가져오기
const getAllArchives = async () => {
  return await archiveMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // fetch list of archives
      const archivesList = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
      ).then((res) => (res ? JSON.parse(res) : []));

      // fetch all archives
      const archives = await Promise.all(
        archivesList.map(
          async (id: string) =>
            await AsyncStorage.getItem(id).then((res) =>
              res ? JSON.parse(res) : null,
            ),
        ),
      );

      // remove null values
      return archives.filter((archive: ArchiveType | null) => archive !== null);
    } catch (e) {
      console.error("[ERROR] error from getting all archives", e);
      return [];
    }
  });
};

// 아카이브 순서 변경
const changeArchiveOrder = async (archiveIds: string[]) => {
  await archiveMutex.runExclusive(async () => {
    try {
      if (!process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION)
        throw new Error(
          "process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION is not defined",
        );

      // save new order
      await AsyncStorage.setItem(
        process.env.EXPO_PUBLIC_DB_ARCHIVE_COLLECTION,
        JSON.stringify(archiveIds),
      );
    } catch (e) {
      console.error("[ERROR] error from changing archive order", e);
    }
  });
};

export {
  createArchive,
  deleteArchive,
  modifyArchive,
  getAllArchives,
  changeArchiveOrder,
};
