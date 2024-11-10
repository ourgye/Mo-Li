import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArchiveDraggableHeader } from "@/components/setting/ArchiveDraggableHeader";
import ArchiveDraggableList from "@/components/setting/ArchiveDraggableList";

export default function SelectArchive() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ArchiveDraggableHeader />
      <ArchiveDraggableList />
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
