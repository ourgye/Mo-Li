import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "./style/Header";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import { useRecord } from "@/hooks/useRecord";

export default function ModifyRecordHeader() {
  const {
    modifyRecord,
    modifyRecordImage,
    modifyRecordImageRatio,
    handleModifyRecord,
    setSelectedRecord,
  } = useRecord();

  const handleOnPressBack = () => {
    router.back();
  };
  const handleOnModify = async () => {
    try {
      if (modifyRecord) {
        const record = await handleModifyRecord(
          modifyRecord,
          modifyRecordImage,
          modifyRecordImageRatio,
          modifyRecord.imagePath,
        );
        if (record) {
          router.back();
        } else {
          alert("수정 실패");
        }
      }
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
      <Pressable style={styles.button} onPress={handleOnModify}>
        <Text style={typos.body1_typo}>수정</Text>
      </Pressable>
    </View>
  );
}
