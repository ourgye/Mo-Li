import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import styles from "./style/Header";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";

export default function ArchiveSelectHeader() {
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
      <Pressable onPress={handleOnPressBack}>
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      {/* =================== 게시 버튼  =================== */}
      <Pressable style={styles.button} onPress={handleOnCreate}>
        <Text style={styles.buttonTitle}>게시</Text>
      </Pressable>
    </View>
  );
}
