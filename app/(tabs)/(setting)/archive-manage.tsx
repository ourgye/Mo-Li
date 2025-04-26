import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArchiveDraggableHeader } from "@/components/setting/ArchiveDraggableHeader";
import ArchiveDraggableList from "@/components/setting/ArchiveDraggableList";
import colors from "@/assets/colors/colors";

export default function ArchiveManage() {
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
    backgroundColor: colors.white0,
    paddingHorizontal: 24,
    gap: 24,
    paddingBottom: 24,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
});
