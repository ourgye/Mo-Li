import { Pressable, Text, View } from "react-native";
import styles from "./styles/AddArchiveButton";
import SvgIcon from "../common/SvgIcon";

export function AddArchiveButton({ onPress }: { onPress: () => void }) {
  return (
    // <Pressable style={styles.iconWrapper} onPress={onPress}>
    <View style={{ flexDirection: "row" }}>
      {/* ============================ 아카이브 추가 버튼 ============================ */}
      <Pressable onPress={onPress} style={styles.iconWrapper}>
        <SvgIcon name="Add_white_icon" size={24} />
      </Pressable>
      {/* ============================ 아카이브 수정 페이지 이동 버튼 ============================ */}
      <Pressable onPress={onPress} style={styles.iconWrapper}>
        <SvgIcon name="Right_white_icon" size={24} />
      </Pressable>
    </View>
  );
}
