import { FlatList, Pressable, Text, View } from "react-native";
import data from "@/constants/MyPage";

import styles from "../common/style/CommonList";
import { Link } from "expo-router";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";
import naviList, { navigationType } from "@/constants/navigation";

const SettingListItem = ({ data }: { data: navigationType }) => {
  if (data.name === "setting") return null;
  return (
    <Link
      href={data.path || "/"}
      style={[
        styles.itemContainer,
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        },
      ]}
    >
      <Text style={typos.body1_typo}>{data?.nameKo}</Text>
    </Link>
  );
};

export default function SettingList() {
  const setting: navigationType = naviList
    .find((item) => item.name === "(tabs)")
    ?.children?.find((item) => item.name === "(setting)") as navigationType;

  return (
    <FlatList
      data={setting.children}
      renderItem={({ item }) => <SettingListItem data={item} />}
      keyExtractor={(item) => item._id.toString() + "setting"}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.4, backgroundColor: colors.gray3 }} />
      )}
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
    />
  );
}
