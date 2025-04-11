import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { RecordType } from "@/constants/types.interface";
import * as FileSystem from "expo-file-system";

import styles from "./style/RecordItem";
import Record from "@/db/schema/record";

export function RecordItem({
  item,
  index,
  // setSelectedRecord,
}: {
  item: Record;
  index: number;
  // setSelectedRecord: (record: RecordType) => void;
}) {
  // 가로 세로 크기 비율을 유지하면서 이미지를 출력(가로는 width-48(padding) / 3)
  const dimension = useWindowDimensions();
  const _width = Math.round((dimension.width - 48 - 24) / 3);

  const onPressItem = () => {
    // setSelectedRecord(item);
    router.navigate(`/(tabs)/(archive)/record-detail/${item._id}`);
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={onPressItem}>
      <Image
        style={[
          styles.image,
          { width: _width, height: _width * item.imageRatio },
        ]}
        source={{ uri: item.imagePath }}
        // source={require("@/assets/images/dummy-images/joshua.jpeg")}
      />
    </Pressable>
  );
}
