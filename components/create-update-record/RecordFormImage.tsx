import { Image, Pressable, Text } from "react-native";
import { useRecordForm } from "@/hooks/useRecordForm";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

import styles from "./style/RecordForm";
import SvgIcon from "../common/SvgIcon";
import ImageCarousel from "./ImageCarousel";

const IMAGE_LIMIT = 5;

export default function RecordFormImage({ modify }: { modify?: boolean }) {
  const {
    // recordImage,
    recordImagePath,
    recordImageRatio,
    // setRecordImage,
    setImageRatio,
    setRecordImagePath,
  } = useRecordForm();

  const handleImagePicker = async () => {
    try {
      console.log(
        "image number can add",
        IMAGE_LIMIT - (recordImagePath?.length || 0),
      );

      if (recordImagePath?.length === IMAGE_LIMIT) {
        alert("사진은 최대 5장까지 추가할 수 있습니다.");
        return;
      }

      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: IMAGE_LIMIT - (recordImagePath?.length || 0),
      });

      if (image.canceled) throw new Error("Image picker canceled");
      const ratioArray = image.assets.map((asset) => {
        return asset.height / asset.width;
      });
      setImageRatio([...(recordImageRatio || []), ...ratioArray]);
      setRecordImagePath([
        ...(recordImagePath || []),
        ...image.assets.map((asset) => asset.uri),
      ]);

      console.log("image", image.assets);
      console.log("ratioArray", ratioArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable
      style={[
        // styles.recordImage,
        { alignSelf: "center" },
        (!recordImagePath || recordImagePath.length === 0) && {
          height: 240,
          width: 240,
          borderWidth: 1,
          borderRadius: 24,
        },
      ]}
      onPress={handleImagePicker}
    >
      {!!recordImagePath && recordImagePath.length > 0 && (
        <ImageCarousel
          // images={recordImage}
          width={styles.recordImage.width}
          modify={modify}
        />
      )}
    </Pressable>
  );
}
