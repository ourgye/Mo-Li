import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordDetailList } from "@/components/archive/RecordDetailList";
import { RecordDetailHeader } from "@/components/archive/RecordDetailHeader";
import { ScrollView } from "react-native-gesture-handler";

export default function RecordDetail() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <RecordDetailHeader />
      <ScrollView>
        <RecordDetailList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
  },
});
