import * as FileSystem from "expo-file-system";

export const deleteImage = async (imagePath: string) => {
  try {
    await FileSystem.deleteAsync(imagePath);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
