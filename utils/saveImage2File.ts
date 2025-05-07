import * as FileSystem from "expo-file-system";
import { ImagePickerResult } from "expo-image-picker";

export const saveImage2File = async (
  // image: ImagePickerResult | undefined,
  image: string[] | undefined,
  id: string,
) => {
  if (!image) {
    console.log("No image");
    throw new Error("No image");
  }

  if (FileSystem.documentDirectory === null) {
    console.log("No document directory");
    throw new Error("No document directory");
  }

  const returnPath = await Promise.all(
    image.map(async (uri, index) => {
      const extension = uri.split(".").pop();
      const newPath =
        FileSystem.documentDirectory + id + index + "." + extension;

      // checkt if file exists
      const fileInfo = await FileSystem.getInfoAsync(newPath);
      if (fileInfo.exists) {
        console.log("File already exists");
        return newPath;
      }

      try {
        await FileSystem.moveAsync({
          from: uri,
          to: newPath,
        });
      } catch (e) {
        console.log("error from saving image", e);
      }

      return newPath;
    }),
  );

  return returnPath;
};
