import * as FileSystem from "expo-file-system";

export const deleteImageAll = async (imagePath: string[]) => {
  // check file exists
  const success = await Promise.all(
    imagePath.map(async (path) => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(path);
        if (!fileInfo.exists) {
          console.log("File does not exist");
          return true;
        }
        await FileSystem.deleteAsync(path);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
  );

  return success.every((item) => item === true);
};
