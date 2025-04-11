import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "./style/Header";
import { useNewRecord } from "@/hooks/useNewRecord";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";

export default function CreateRecordHeader({
  createRecord,
}: {
  createRecord: () => void;
}) {
  const { setInitiailState } = useNewRecord();

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
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      {/* =================== 게시 버튼  =================== */}
      <Pressable style={styles.button} onPress={handleOnCreate}>
        <Text style={typos.body1_typo}>게시</Text>
      </Pressable>
    </View>
  );
}
