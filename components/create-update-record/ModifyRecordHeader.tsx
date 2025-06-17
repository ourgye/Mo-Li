import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "./style/Header";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import { useRecordForm } from "@/hooks/useRecordForm";

export default function ModifyRecordHeader({
  modifyRecord,
  buttonEnable,
}: {
  modifyRecord: () => void;
  buttonEnable: boolean;
}) {
  const { setInitiailState } = useRecordForm();

  const handleOnPressBack = () => {
    try {
      setInitiailState();
      router.back();
    } catch (error) {
      alert(error);
    }
  };
  const handleOnUpdate = () => {
    try {
      modifyRecord();
      router.back();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.headerContainer}>
      {/* =================== 뒤로가기 버튼  =================== */}
      <Pressable onPress={handleOnPressBack} style={styles.iconWrapper}>
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      {/* =================== 게시 버튼  =================== */}
      <Pressable
        style={[styles.button, !buttonEnable && styles.buttonDisable]}
        disabled={!buttonEnable}
        onPress={handleOnUpdate}
      >
        <Text style={typos.body1_typo}>수정</Text>
      </Pressable>
    </View>
  );
}
