import { Image, Pressable } from "react-native";
import { useRecordForm } from "@/hooks/useRecordForm";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

import styles from "./style/RecordForm";

export default function RecordFormImage({ modify }: { modify?: boolean }) {
  const {
    recordImage,
    recordImagePath,
    recordImageRatio,
    setRecordImage,
    setImageRatio,
  } = useRecordForm();

  const handleImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (image.canceled) throw new Error("Image picker canceled");
      setRecordImage(image);
      console.log("image", image);
      const ratioArray = image.assets.map((asset) => {
        return asset.height / asset.width;
      });
      console.log("ratioArray", ratioArray);
      setImageRatio(ratioArray);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    // <Pressable
    //   style={[styles.recordImage, !recordImage && { height: 240 }]}
    //   onPress={handleImagePicker}
    // >
    //   {recordImage?.assets &&
    //     recordImage.assets.length > 0 &&
    //     recordImage.assets.map((asset, index) => {
    //       console.log("asset??", asset);
    //       return (
    //         <Image
    //           key={index}
    //           style={[
    //             // styles.image,
    //             { resizeMode: "cover" },
    //             { height: (240 * asset.height) / asset.width },
    //           ]}
    //           source={{ uri: asset.uri }}
    //         />
    //       );
    //     })}
    //   {modify &&
    //     recordImage === undefined && // modify일 때 recordImage가 없으면 recordImagePath를 사용
    //     recordImagePath.length > 0 &&
    //     recordImagePath.map((uri, index) => {
    //       console.log("uri", uri);
    //       return (
    //         <Image
    //           key={index}
    //           style={[
    //             // styles.image,
    //             { resizeMode: "cover" },
    //             { height: 240 * recordImageRatio[index] },
    //           ]}
    //           source={{ uri: uri }}
    //         />
    //       );
    //     })}
    // </Pressable>
  );
}