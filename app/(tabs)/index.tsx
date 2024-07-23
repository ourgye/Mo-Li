import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArchiveList } from "@/components/home/ArchiveList";
import { HomeCalendar } from "@/components/home/HomeCalendar";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeCalendar />
      <View style = {{flex: 1}}>
        <ArchiveList />
      </View>
    </SafeAreaView>
  );
}

// styles, 임시 스타일 변경 가능
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 24,
    height: "100%",
  },
});
