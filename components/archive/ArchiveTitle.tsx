import { Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ArchiveTitleProps = {
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    paddingHorizontal: 24,
    // 임시 상위 패딩 (맘대로 변경 가능)
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});
