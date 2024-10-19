import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ArchiveDataWithRecentDateWORecords } from "@/constants/types.interface";
import typos from "@/assets/fonts/typos";

import styles from './styles/HomeArchiveListItem'

export type ItemData = {
  title: string;
  total: number;
  recentDate: string;
};

export type ArchiveListItemProps = {
  item: ArchiveDataWithRecentDateWORecords;
  onPress: () => void;
};

export function ArchiveListItem({ item, onPress }: ArchiveListItemProps) {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.itemWrapper}>
        <Text style={[typos.subtitle_typo]}>{item.name}</Text>
        <View style={styles.itemRight}>
          <Text style={styles.itemTextRight}>
            {item.recordLength != 0
              ? item.recordLength + "개 | " + item.recentDate
              : "컨텐츠가 없습니다"}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#888888"
          />
        </View>
      </Pressable>
    </View>
  );
}
