import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithTitle } from "@/components/common/HeaderWithTitle";
import { ArchiveData } from "@/constants/types.interface";
import { getArchiveWORecord } from "@/db/archive-method";
import ArchiveDraggableList from "@/components/setting/ArchiveDraggableList";

export default function SelectArchive() {
  const archiveData: ArchiveData[] = getArchiveWORecord();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderWithTitle title="아카이브" />
        <ArchiveDraggableList data={archiveData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    paddingHorizontal: 24,
    gap: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});