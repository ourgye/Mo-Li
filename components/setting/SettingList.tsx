import { FlatList, Pressable, Text, View } from "react-native";
import data from "@/constants/MyPage";

import styles from "../common/style/CommonList";
import { MyPageListType } from "@/constants/types.interface";
import { Link } from "expo-router";

const SettingListItem = ({ data }: { data: MyPageListType }) => {
  return (
    <Link
      href={data.path}
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
      <Text style={[styles.title]}>{data?.name}</Text>
    </Link>
  );
};

export default function SettingList() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SettingListItem data={item} />}
      keyExtractor={(item) => item._id.toString()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.7, backgroundColor: "#CBCBCB" }} />
      )}
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
    />
  );
}
