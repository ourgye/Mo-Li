import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useRecordForm } from "@/hooks/useRecordForm";
import * as ImagePicker from "expo-image-picker";
import { memo, useCallback } from "react";

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
    } catch (e) {
      // Handle error silently or with proper error handling
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePicker}>
        <ImageCarousel modify={modify} />
      </TouchableOpacity>
    </View>
  );
}
