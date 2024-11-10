import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithTitle } from "@/components/common/HeaderWithTitle";
import { ArchiveSelectList } from "@/components/create-record/ArchiveSelectList";
import ArchiveModal from "@/components/common/ArchiveModal";
import { useEffect, useState } from "react";
import { useArchiveList } from "@/hooks/useArchiveList";

export default function SelectArchive() {
  const [modalVisible, setModalVisible] = useState(false);
  const { refreshArchiveList } = useArchiveList();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderWithTitle title="아카이브" setModalVisible={setModalVisible} />
      <ArchiveSelectList modalVisible={modalVisible} />
      <ArchiveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    gap: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
