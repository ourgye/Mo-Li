import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import ArchiveModal from "./ArchiveModal";
import { useState } from "react";

// 아카이브 추가 모달 여기에 있음
export function HeaderWithTitle({
  title,
}: {
  title: string | undefined;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <ArchiveModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* 게시 버튼 */}
      <Pressable onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="plus" size={32} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 24,
  },
});
