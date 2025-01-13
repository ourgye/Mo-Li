import { RecordType } from "@/constants/types.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import * as FileSystem from "expo-file-system";

import styles from "./style/RecordDetailItem";

export function RecordDetailItem({
  item,
  index,
}: {
  item: RecordType;
  index: number;
}) {
  const dimension = useWindowDimensions();
  const _width = Math.round(dimension.width - 48 - 32);

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text>{item.date.split("T")[0]}</Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={16}
          color="grey"
        />
      </View>
      <View>
        <Image
          borderRadius={16}
          source={{ uri: item.imagePath }}
          width={_width}
          height={_width * item.imageRatio}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{item.body}</Text>
      </View>
    </View>
  );
}
