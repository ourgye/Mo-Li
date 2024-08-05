import { Text, StyleSheet, View } from "react-native";
import { CommonList, CommonList as SettingList } from "@/components/CommonList";
import { type CommonListItemProps } from "@/components/CommonListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 24 }}>내 정보</Text>
      </View>
    );
  };

  const data: CommonListItemProps[] = [
    { leftIcon: "none", title: "아카이브 관리", rightIcon: "chevron-right" },
    { leftIcon: "none", title: "iCloud 동기화", rightIcon: "chevron-right" },
    { leftIcon: "none", title: "알림", rightIcon: "chevron-right" },
    { leftIcon: "none", title: "언어", rightIcon: "chevron-right" },
    { leftIcon: "none", title: "도움말", rightIcon: "chevron-right" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CommonList data={data} scrollEnabled={false} />
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
