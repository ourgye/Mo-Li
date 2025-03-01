import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import styles from "./style/Header";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";

export default function CreateRecordHeader() {
  const { handleCreateNewRecordHome } = useHomeNewRecord();
  const handleOnPressBack = () => {
    router.back();
  };
  const handleOnCreate = () => {
    handleCreateNewRecordHome();
    router.back();
  };

  return (
    <View style={styles.headerContainer}>
      {/* =================== 뒤로가기 버튼  =================== */}
      <Pressable onPress={handleOnPressBack} style={styles.iconWrapper}>
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      {/* =================== 게시 버튼  =================== */}
      <Pressable style={styles.button} onPress={handleOnCreate}>
        <Text style={typos.body1_typo}>게시</Text>
      </Pressable>
    </View>
  );
}
