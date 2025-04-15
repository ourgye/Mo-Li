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
  const returnPath = await Promise.all(
    image.assets.map(async (asset, index) => {
      const extension = asset.uri.split(".").pop();
      const newPath =
        FileSystem.documentDirectory + id + index + "." + extension;

      try {
        await FileSystem.moveAsync({
          from: asset.uri,
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
