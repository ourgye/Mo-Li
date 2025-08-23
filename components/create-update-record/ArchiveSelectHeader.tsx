import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import styles from "../common/style/HeaderWithTitle";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import colors from "@/assets/colors/colors";

export default function ArchiveSelectHeader({
  title,
  setModalVisible,
}: {
  title: string | undefined;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.headerContainer}>
      {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      <Text style={typos.header_typo}>{title}</Text>
      {/* ========================= + 버튼 ========================= */}
      <Pressable
        onPress={() => (setModalVisible ? setModalVisible(true) : null)}
      >
        <SvgIcon name="Add_icon" size={24} fill={colors.blue0} />
      </Pressable>
    </View>
  );
}
