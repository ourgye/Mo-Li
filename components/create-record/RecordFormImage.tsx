import { Image, Pressable } from "react-native";
import { useNewRecord } from "@/hooks/useNewRecord";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

import styles from "./style/RecordForm";

export default function RecordFormImage() {
  const { newRecordImage, setRecordImage, setImageRatio } = useNewRecord();

  const handleImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
      });
      if (image.canceled) throw new Error("Image picker canceled");
      setRecordImage(image);
      setImageRatio(image.assets[0].height / image.assets[0].width);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Pressable
      style={[styles.recordImage, !newRecordImage && { height: 240 }]}
      onPress={handleImagePicker}
    >
      {newRecordImage?.assets && (
        <Image
          source={{ uri: newRecordImage.assets[0].uri }}
          width={240}
          height={
            (newRecordImage.assets[0].height / newRecordImage.assets[0].width) *
            240
          }
          resizeMethod="resize"
        />
      )}
    </Pressable>
  );
}
