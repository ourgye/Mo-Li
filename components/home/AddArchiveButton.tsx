// 메인 페이지 아카이브 추가 버튼 컴포넌트
import { Pressable, Text } from "react-native";

import styles from "./styles/AddArchiveButton";

export function AddArchiveButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.addArchiveButton} onPress={onPress}>
      <Text style={styles.buttonFont}>아카이브 추가하기</Text>
    </Pressable>
  );
}
