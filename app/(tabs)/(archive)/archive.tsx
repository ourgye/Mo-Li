import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/common/FloatingCreateRecordButton";
import { ArchiveInfo } from "@/components/archive/ArchiveInfo";
import { RecordList } from "@/components/archive/RecordList";
import { OrderCustomDropDown } from "@/components/archive/OrderDropDown";
import orderList from "@/constants/Order";

export default function Archive() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton from="(archive)" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ArchiveInfo />
        <View style={styles.body}>
          <RecordList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  body: {
    flex: 1,
  },
});
