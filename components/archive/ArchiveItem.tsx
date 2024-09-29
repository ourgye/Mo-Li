import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentArchive } from "@/slices/archiveSlice";
import { ArchiveDataWithRecentDate } from "@/constants/types.interface";

import styles from "./style/ArchiveItem";

export function ArchiveItem({
  isSelected,
  data,
  index,
  setShowArchives,
}: {
  isSelected: boolean | undefined;
  data: ArchiveDataWithRecentDate;
  index: number;
  setShowArchives: any;
}) {
  const dispatch = useAppDispatch();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        dispatch(setCurrentArchive(data));
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
