import { Pressable, Text, View } from "react-native";
import styles from "./styles/AddArchiveButton";

export function AddArchiveButton({ onPress }: { onPress: () => void }) {
  return (
    // <Pressable style={styles.addArchiveButton} onPress={onPress}>
    <View style={{ flexDirection: "row" }}>
      {/* ============================ 아카이브 추가 버튼 ============================ */}
      <Pressable
        style={{ borderWidth: 2, borderColor: "red" }}
        onPress={onPress}
      >
        {/* <Text style={styles.buttonFont}>+</Text> */}
        <Text style={styles.buttonFont}>추가</Text>
      </Pressable>
      {/* ============================ 아카이브 수정 페이지 이동 버튼 ============================ */}
      <Pressable
        style={{ borderWidth: 2, borderColor: "red" }}
        onPress={onPress}
      >
        {/* <Text style={styles.buttonFont}>+</Text> */}
        <Text style={styles.buttonFont}>이동</Text>
      </Pressable>
    </View>
  );
}
