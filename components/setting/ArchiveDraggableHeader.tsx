import { View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import styles from "../common/style/HeaderWithTitle";
import { useState } from "react";
import ArchiveModal from "../common/ArchiveModal";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";

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
        <SvgIcon name="Back_icon" size={24} />
      </Pressable>
      <Text style={typos.header_typo}>아카이브 관리</Text>
      <Pressable
        onPress={() => (setModalVisible ? setModalVisible(true) : null)}
      >
        <SvgIcon name="Add_icon" size={24} />
      </Pressable>
    </View>
  );
}
