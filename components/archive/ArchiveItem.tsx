import { View, Text, Pressable } from "react-native";

import styles from "./style/ArchiveItem";
import typos from "@/assets/fonts/typos";
import Archive from "@/db/schema/archive";
import dayjs from "dayjs";

export function ArchiveItem({
  isSelected,
  data,
  onPressArchiveItem,
}: {
  isSelected: boolean | undefined;
  data: Archive;
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
          {data.count ? data.count + " 개" : "데이터가 없습니다"}
          {data.lastDate && " | " + dayjs(data.lastDate).format("YYYY-MM-DD")}
        </Text>
      </View>
    </Pressable>
  );
}
