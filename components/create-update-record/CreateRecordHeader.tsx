import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "./style/Header";
import { useRecordForm } from "@/hooks/useRecordForm";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";

export default function CreateRecordHeader({
  createRecord,
  buttonEnable,
}: {
  createRecord: () => void;
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
  const handleOnCreate = () => {
    try {
      createRecord();
      router.back();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* =================== 뒤로가기 버튼  =================== */}
      <Pressable onPress={handleOnPressBack} style={styles.iconWrapper}>
        <SvgIcon name="Back_icon" size={24} fill={colors.blue0} />
      </Pressable>
      <Text style={[typos.header_typo, styles.headerTypo]}>레코드 추가</Text>
      {/* =================== 게시 버튼  =================== */}
      <Pressable
        style={[styles.button, !buttonEnable && styles.buttonDisable]}
        disabled={!buttonEnable}
        onPress={handleOnCreate}
      >
        <Text style={typos.body3_typo}>게시</Text>
      </Pressable>
    </View>
  );
}
