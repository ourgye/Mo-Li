import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Contact() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerContainer}>
        <Text style={typos.header_typo}>문의하기</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray1,
    paddingHorizontal: 24,
    gap: 24,
    paddingBottom: 24,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
