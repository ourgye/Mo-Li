import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectCurrentOrder, setCurrentArchive, setCurrentOrder } from "@/slices/archiveSlice";
import { ArchiveDataWithRecentDate } from "@/constants/types.interface";

export function ArchiveItem({
  isSelected,
  data,
  index,
  setShowArchives
}: {
  isSelected: boolean | undefined;
  data: ArchiveDataWithRecentDate;
  index: number;
  setShowArchives: any;
}) {
  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector(selectCurrentOrder);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        dispatch(setCurrentArchive(data));
        dispatch(setCurrentOrder(currentOrder));
        setShowArchives(false);
      }}
    >
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
        <Text style={styles.totalDate}>
          {data.recordLength + " 개"}
          {data.recentDate && " | " + data.recentDate}
        </Text>
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
    color: "#888888",
  },
});
