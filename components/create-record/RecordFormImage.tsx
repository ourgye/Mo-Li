import { Image, Pressable } from "react-native";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

import styles from "./style/RecordForm";

export default function RecordFormImage() {
  const { newRecordImage, setRecordImage } = useHomeNewRecord();

  const handleImagePicker = useCallback(async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
      });
      if (image.canceled) throw new Error("Image picker canceled");
      setRecordImage(image);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Pressable
      style={[styles.recordImage, !newRecordImage && { height: 234 }]}
      onPress={handleImagePicker}
    >
      {newRecordImage?.assets && (
        <Image
          source={{ uri: newRecordImage.assets[0].uri }}
          width={234}
          height={
            (newRecordImage.assets[0].height / newRecordImage.assets[0].width) *
            234
          }
          resizeMethod="resize"
        />
      )}
    </Pressable>
  );
}
