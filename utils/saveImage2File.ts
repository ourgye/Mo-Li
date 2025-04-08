import * as FileSystem from "expo-file-system";
import { ImagePickerResult } from "expo-image-picker";

export const saveImage2File = async (
  image: ImagePickerResult | undefined,
  id: string,
) => {
  if (!image) {
    console.log("No image");
    throw new Error("No image");
  }

  if (!image.assets) {
    console.log("No image assets");
    throw new Error("No image");
  }
  if (FileSystem.documentDirectory === null) {
    console.log("No document directory");
    throw new Error("No document directory");
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

export const deleteImageFile = async (imagePath: string) => {
  try {
    // check file exists
    const fileInfo = await FileSystem.getInfoAsync(imagePath);
    if (!fileInfo.exists) {
      console.log("File does not exist");
      return;
    }
    await FileSystem.deleteAsync(imagePath);
  } catch (e) {
    console.log(e);
  }
};

export const modifyImage = async (
  image: ImagePickerResult | undefined,
  id: string,
  prevImagePath: string,
) => {
  if (!image) {
    console.log("No image");
    return prevImagePath;
  }

  if (!image.assets) {
    console.log("No image assets");
    throw new Error("No image");
  }
  if (FileSystem.documentDirectory === null) {
    console.log("No document directory");
    throw new Error("No document directory");
  }
  // delete previous image
  try {
    await FileSystem.deleteAsync(prevImagePath);
  } catch (e) {
    console.log(e);
  }
  // save new image
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
