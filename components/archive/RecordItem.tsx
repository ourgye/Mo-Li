import { router } from "expo-router";
import { memo, useCallback, useMemo } from "react";
import { Image, Pressable, useWindowDimensions } from "react-native";

import styles from "./style/RecordItem";
import Record from "@/db/schema/record";

export const RecordItem = memo(
  ({
    item,
    index,
    order,
    // setSelectedRecord,
  }: {
    item: Record;
    index: number;
    order?: "desc" | "asc";
    // setSelectedRecord: (record: RecordType) => void;
  }) => {
    // 가로 세로 크기 비율을 유지하면서 이미지를 출력(가로는 width-48(padding) / 3)
    const dimension = useWindowDimensions();
    const _width = useMemo(
      () => Math.round((dimension.width - 48 - 24) / 3),
      [dimension.width],
    );

    const imageStyle = useMemo(
      () => ({
        width: _width,
        height: _width * (item.imageRatio.length > 0 ? item.imageRatio[0] : 1),
      }),
      [_width, item.imageRatio],
    );

    const onPressItem = useCallback(() => {
      // Pass index and order as params for proper navigation
      router.push({
        pathname: "/(tabs)/(archive)/record-detail/[id]",
        params: {
          id: item._id.toString(),
          initialIndex: index.toString(),
          order: order || "desc",
        },
      });
    }, [item._id, index, order]);

    return (
      <Pressable style={{ alignItems: "center" }} onPress={onPressItem}>
        {/* first image */}
        <Image
          style={[styles.image, imageStyle]}
          source={{ uri: item.imagePath.length > 0 ? item.imagePath[0] : "" }}
          // source={require("@/assets/images/dummy-images/joshua.jpeg")}
        />
      </Pressable>
    );
  },
);
