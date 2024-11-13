import { Pressable, Text, View } from "react-native";
import styles from "./styles/AddArchiveButton";
import SvgIcon from "../common/SvgIcon";
import { router } from "expo-router";

export function AddArchiveButton({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleOnPressAddArchive = () => {
    setModalVisible(true);
  };

  return (
    // <Pressable style={styles.iconWrapper} onPress={onPress}>
    <View style={{ flexDirection: "row" }}>
      {/* ================================ 아카이브 추가 버튼 ================================= */}
      <Pressable onPress={handleOnPressAddArchive} style={styles.iconWrapper}>
        <SvgIcon name="Add_white_icon" size={24} />
      </Pressable>
      {/* ============================ 아카이브 수정 페이지 이동 버튼 ============================ */}
      <Pressable
        onPress={() => {
          router.navigate("/(tabs)/(setting)/archive-manage");
        }}
        style={styles.iconWrapper}
      >
        <SvgIcon name="Right_white_icon" size={24} />
      </Pressable>
    </View>
  );
}
