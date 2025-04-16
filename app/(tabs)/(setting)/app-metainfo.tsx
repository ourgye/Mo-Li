import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppMetaInfo() {
  return (
    <SafeAreaView>
      <View style={{ padding: 24 }}>
        <View style={{ marginBottom: 16 }}>
          <Text>앱 빌드 버전</Text>
        </View>
        <Text>로그 및 추가 내용</Text>
      </View>
    </SafeAreaView>
  );
}
