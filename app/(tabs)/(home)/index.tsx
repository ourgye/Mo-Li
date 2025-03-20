import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeList } from "@/components/home/HomeList";
import { FloatingCreateRecordButton } from "@/components/common/FloatingCreateRecordButton";
import { HomeCalendar } from "@/components/home/HomeCalendar";
import { ScrollView } from "react-native-gesture-handler";
import { useCalendar } from "@/hooks/useCalendar";

export default function HomeScreen() {
  // const { handleIndexRefresh } = useCalendar();

  // const onScrollBeginDrag = () => {
  //   console.log("onScrollBeginDrag");
  //   handleIndexRefresh();
  // };

  return (
    <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
      <FloatingCreateRecordButton />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        // onScrollBeginDrag={onScrollBeginDrag}
      >
        <HomeCalendar />
        <HomeList />
      </ScrollView>
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
