import { Image, Pressable } from "react-native";
import { useNewRecord } from "@/hooks/useNewRecord";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

import styles from "./style/RecordForm";
import { useRecord } from "@/hooks/useRecord";

export default function RecordFormImage() {
  const {
    setModifyRecordImage,
    setModifyRecordImageRatio,
    setModifyRecord,
    modifyRecordImage,
    modifyRecordImageRatio,
    modifyRecord,
  } = useRecord();

  const handleImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
      });
      if (image.canceled) throw new Error("Image picker canceled");
      setModifyRecordImage(image);
      setModifyRecordImageRatio(image.assets[0].height / image.assets[0].width);
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (modifyRecordImage && modifyRecordImage.assets && modifyRecordImageRatio) {
    return (
      <Pressable style={[styles.recordImage]} onPress={handleImagePicker}>
        <Image
          source={{ uri: modifyRecordImage?.assets[0].uri }}
          width={240}
          height={modifyRecordImageRatio * 240}
          resizeMethod="resize"
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.recordImage, !modifyRecord?.imagePath && { height: 240 }]}
      onPress={handleImagePicker}
    >
      {modifyRecord?.imagePath && (
        <Image
          source={{ uri: modifyRecord?.imagePath }}
          width={240}
          height={modifyRecord?.imageRatio * 240}
          resizeMethod="resize"
        />
      )}
    </Pressable>
  );
}
