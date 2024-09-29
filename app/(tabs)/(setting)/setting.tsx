import { Text, StyleSheet, View } from "react-native";
import { CommonList, CommonList as SettingList } from "@/components/common/CommonList";
import { type CommonListItemProps } from "@/components/common/CommonListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import MyPageData from "@/constants/MyPage";
import { useRouter } from "expo-router";

export default function Setting() {
  const router = useRouter();

  const data: CommonListItemProps[] = MyPageData.map((item) => ({
    leftIcon: "none",
    name: item.name,
    rightIcon: "chevron-right",
    _id: item._id.toString(),
    setSelected: (): {} => ({ router: router.navigate(item.path) }),
  }));

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 24 }}>내 정보</Text>
      </View>
    );
  };

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
