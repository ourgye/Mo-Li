import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { RecordData } from "@/constants/types.interface";

export function RecordItem(item: RecordData) {
  // 가로 세로 크기 비율을 유지하면서 이미지를 출력(가로는 width-48(padding) / 3)
  const dimension = useWindowDimensions();
  const _width = Math.round((dimension.width - 48 - 24) / 3);
  const [height, setHeight] = useState<number>(0);
  useEffect(() => {
    Image.getSize(item.imagePath, (width, height) => {
      setHeight((_width * height) / width);
    });
  });

  const onPressItem = () => {
    router.navigate("(archive)/하이랄 정복기");
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={onPressItem}>
      <Image
        style={{
          width: _width,
          height: height,
          marginHorizontal: 4,
          marginBottom: 8,
          borderRadius: 8,
        }}
        source={{ uri: item.imagePath ? item.imagePath : "https://picsum.photos/300" }}
      />
    </Pressable>
  );
}
