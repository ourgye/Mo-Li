import SettingList from "@/components/setting/SettingList";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 24 }}>내 정보</Text>
    </View>
  );
};

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SettingList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  container: {
    paddingHorizontal: 24,
    gap: 24,
    flex: 1,
  },
});
