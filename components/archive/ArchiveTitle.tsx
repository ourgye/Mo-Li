import { Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from './style/ArchiveTitle'

interface ArchiveTitleProps {
  current: string | undefined;
  onPress: () => void;
};

export function ArchiveTitle({
  current = "제목이 없습니다",
  onPress,
}: ArchiveTitleProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{current ?? "아카이브가 없습니다."}</Text>
      <MaterialCommunityIcons
        name="chevron-down-circle"
        size={16}
        color="black"
      />
    </Pressable>
  );
}
