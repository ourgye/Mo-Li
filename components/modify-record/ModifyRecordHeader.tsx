import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "./style/Header";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";

export default function ModifyRecordHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* =================== 뒤로가기 버튼  =================== */}
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={styles.iconWrapper}
      >
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      {/* =================== 게시 버튼  =================== */}
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={typos.body1_typo}>수정</Text>
      </Pressable>
    </View>
  );
}
