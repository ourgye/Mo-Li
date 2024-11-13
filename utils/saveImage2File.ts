import * as FileSystem from "expo-file-system";
import { ImagePickerResult } from "expo-image-picker";

export const saveImage2File = async (
  image: ImagePickerResult | undefined,
  id: string,
) => {
  if (!image) {
    console.log("No image");
    return "";
  }

  if (!image.assets) {
    console.log("No image assets");
    return "";
  }
  if (FileSystem.documentDirectory === null) {
    console.log("No document directory");
    return "";
  }
  const fileName = image.assets[0].uri.split("/").pop();
  const newPath = FileSystem.documentDirectory + id + fileName;
  try {
    await FileSystem.moveAsync({
      from: image.assets[0].uri,
      to: newPath,
    });
    return newPath;
  } catch (e) {
    console.log(e);
    return "";
  }
};