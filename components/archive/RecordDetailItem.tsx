import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

export type RecordDetailItemProps = {
  date: string;
  image: string;
  body: string;
};

export function RecordDetailItem({ date, image, body }: RecordDetailItemProps) {
  const dimension = useWindowDimensions();
  const [height, setHeight] = useState<number>(0);
  const _width = Math.round(dimension.width - 48 - 32);

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setHeight((_width * height) / width);
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text>{date}</Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={16}
          color="grey"
        />
      </View>
      <View>
        <Image
          borderRadius={16}
          source={{ uri: image }}
          width={_width}
          height={height}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{body}</Text>
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
