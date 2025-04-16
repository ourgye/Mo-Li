import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemePage() {
  return (
    <SafeAreaView>
      <View style={{ padding: 24 }}>
        <View style={{ marginBottom: 16 }}>
          <Text>테마</Text>
        </View>
        <Text>테마 변경 페이지(유료전용)</Text>
      </View>
    </SafeAreaView>
  );
}
