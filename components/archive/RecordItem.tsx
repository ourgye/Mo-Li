import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { RecordData } from "@/constants/types.interface";
import * as FileSystem from "expo-file-system";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedRecordIndex } from "@/slices/archiveSlice";
import styles from "./style/RecordItem";

export function RecordItem({item, index}: {item: RecordData, index: number}) {
  // 가로 세로 크기 비율을 유지하면서 이미지를 출력(가로는 width-48(padding) / 3)
  const dimension = useWindowDimensions();
  const _width = Math.round((dimension.width - 48 - 24) / 3);
  const [height, setHeight] = useState<number>(0);
  const dispatch = useAppDispatch();
  const imagePath = FileSystem.documentDirectory + item.imagePath;

  useEffect(() => {
    Image.getSize(imagePath, (width, height) => {
      setHeight((_width * height) / width);
    });
  });

  const onPressItem = () => {
    dispatch(setSelectedRecordIndex(index));
    router.navigate("(archive)/record-detail");
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={onPressItem}>
      <Image
        style={[styles.image, {width: _width, height: height}]}
        source={{ uri: imagePath }}
      />
    </Pressable>
  );
}
