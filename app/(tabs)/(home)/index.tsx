import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeList } from "@/components/home/HomeList";
import { FloatingCreateRecordButton } from "@/components/FloatingCreateRecordButton";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getAllRecords, getRecordByArchiveDate } from "@/db/record-method";

export default function HomeScreen() {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const archiveId = useAppSelector(
    (state) => state.calendar.currentArchive?._id
  );
  const records = getAllRecords();

  return (
    <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
      <FloatingCreateRecordButton from="(home)" />
      <View style={{ flex: 1 }}>
        <HomeList data={records} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#F8F8F8",
  },
});
