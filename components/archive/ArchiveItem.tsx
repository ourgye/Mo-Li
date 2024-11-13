import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/reduxHooks";

import styles from "./style/ArchiveItem";
import { ArchiveType } from "@/constants/types.interface";

export function ArchiveItem({
  isSelected,
  data,
  onPressArchiveItem,
}: {
  isSelected: boolean | undefined;
  data: ArchiveType;
  onPressArchiveItem: () => void;
}) {
  return (
    <Pressable style={styles.container} onPress={onPressArchiveItem}>
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
          {data.count + " 개"}
          {data.lastDate && " | " + data.lastDate}
        </Text>
      </View>
    </Pressable>
  );
}
