import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import styles from "../common/style/HeaderWithTitle";

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
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* ========================= + 버튼 ========================= */}
      <Pressable
        onPress={() => (setModalVisible ? setModalVisible(true) : null)}
      >
        <MaterialCommunityIcons name="plus" size={32} color="black" />
      </Pressable>
    </View>
  );
}
