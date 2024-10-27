import { StyleSheet } from "react-native";
import { HeaderWithTitle } from "@/components/common/HeaderWithTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordDetailList } from "@/components/archive/RecordDetailList";
import { useAppSelector } from "@/hooks/reduxHooks";

export default function RecordDetail() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* <HeaderWithTitle title={currentArchive?.name} /> */}
      <RecordDetailList />
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
