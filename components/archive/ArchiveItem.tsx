import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { type ItemData } from "../home/ArchiveListItem";

export type ArchiveItemProps = {
  current: string;
  data: ItemData;
  onPress: (title: string) => void;
};

export function ArchiveItem({ current, data, onPress }: ArchiveItemProps) {
  return (
    <Pressable style={styles.container} onPress={()=>{onPress(data.title)}}>
      <View style={styles.titleWrapper}>
        <View style={styles.iconWrapper}>
          {current == data.title && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={16}
              color="#00CFF9"
            />
          )}
        </View>
        <Text style={[styles.title, current == data.title && styles.clicked]}>
          {data.title}
        </Text>
      </View>
      <View style={styles.totalDateWrapper}>
        <Text style={styles.totalDate}>{data.total + "개"} | {data.recentDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16, 
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  clicked: {
    color: "#00CFF9",
  },
  iconWrapper: {
    width: 10,
    height: 16,
  },
  totalDateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", 
  },
  totalDate: {
    fontSize: 12, 
    color: "#888888"
  }
});
