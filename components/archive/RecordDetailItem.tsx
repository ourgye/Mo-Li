import { RecordData } from "@/constants/types.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";

export function RecordDetailItem({ item, index }: {item: RecordData, index: number}) {
  const dimension = useWindowDimensions();
  const [height, setHeight] = useState<number>(0);
  const _width = Math.round(dimension.width - 48 - 32);
  const imagePath = FileSystem.documentDirectory + item.imagePath;

  useEffect(() => {
    Image.getSize(imagePath, (width, height) => {
      setHeight((_width * height) / width);
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text>{item.date}</Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={16}
          color="grey"
        />
      </View>
      <View>
        <Image
          borderRadius={16}
          source={{ uri: imagePath }}
          width={_width}
          height={height}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{item.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    gap: 16,
    borderRadius: 16,
    flexDirection: "column",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyText: {
    paddingHorizontal: 8,
    fontSize: 16,
    lineHeight: 24,
  },
});
