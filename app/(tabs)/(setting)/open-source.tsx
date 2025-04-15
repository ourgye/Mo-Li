import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OpenSource() {
  return (
    <SafeAreaView>
      <View style={{ padding: 24 }}>
        <View style={{ marginBottom: 16 }}>
          <Text>오픈소스 라이센스</Text>
        </View>
        <Text>라이센스 내용</Text>
      </View>
    </SafeAreaView>
  );
}
