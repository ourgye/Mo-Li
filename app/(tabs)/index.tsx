import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeList } from "@/components/home/HomeList";
import { FloatingAddRecordButton } from "@/components/FloatingAddRecordButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <FloatingAddRecordButton />
      <View style={{ flex: 1 }}>
        <HomeList />
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
