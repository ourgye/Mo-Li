import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ArchiveDataAll} from "@/constants/types.interface";

export function ArchiveItem({ isSelected, data, onPress }: { isSelected: boolean | undefined, data: ArchiveDataAll, onPress: (title: string) => void }) {
  return (
    <Pressable style={styles.container} onPress={()=>{onPress(data.name)}}>
      <View style={styles.titleWrapper}>
        <View style={styles.iconWrapper}>
          {isSelected && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={16}
              color="#00CFF9"
            />
          )}
        </View>
        <Text style={[styles.title, isSelected && styles.clicked]}>
          {data.name}
        </Text>
      </View>
      <View style={styles.totalDateWrapper}>
        <Text style={styles.totalDate}>{data.total.toString()} 개 | {data.recent.toDateString()}</Text>
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