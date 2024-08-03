import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function CreateRecord() {
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
        <Link asChild href={""}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
        </Link>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "yellow",
    justifyContent: "space-between",
  },
  container: {
    paddingHorizontal: 24,
  },
});
