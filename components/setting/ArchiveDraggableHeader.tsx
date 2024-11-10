import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import styles from "../common/style/HeaderWithTitle";
import { useState } from "react";
import ArchiveModal from "../common/ArchiveModal";

export function ArchiveDraggableHeader() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.headerContainer}>
      <ArchiveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>아카이브 관리</Text>
      {/* ========================= + 버튼 ========================= */}
      <Pressable
        onPress={() => (setModalVisible ? setModalVisible(true) : null)}
      >
        <MaterialCommunityIcons name="plus" size={32} color="black" />
      </Pressable>
    </View>
  );
}
