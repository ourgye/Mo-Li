import typos from "@/assets/fonts/typos";
import SettingList from "@/components/setting/SettingList";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingAd from "@/components/ad/setting-ad";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={typos.header_typo}>내 정보</Text>
    </View>
  );
};

export default function Setting() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <SettingAd />
        <SettingList />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
