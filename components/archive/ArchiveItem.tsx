import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/reduxHooks";

import styles from "./style/ArchiveItem";
import { ArchiveType } from "@/constants/types.interface";
import typos from "@/assets/fonts/typos";

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
    <Pressable
      style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
      onPress={onPressArchiveItem}
    >
      <View style={styles.titleWrapper}>
        <Text style={[isSelected ? typos.subtitle1_typo : typos.body1_typo]}>
          {data.name}
        </Text>
      </View>
      <View style={styles.totalDateWrapper}>
        <Text style={typos.caption2_typo}>
          {data.count + " 개"}
          {data.lastDate && " | " + data.lastDate}
        </Text>
      </View>
    </Pressable>
  );
}
