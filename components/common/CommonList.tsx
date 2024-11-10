// 아카이브 선택
// 아카이즈 수정 및 삭제(내 정보 안에 있는)
// 내 정보 에서 사용

import { FlatList, View } from "react-native";
import { CommonListItem, type CommonListItemProps } from "./CommonListItem";

import styles from "./style/CommonList";

interface CommonListProp {
  data: CommonListItemProps[];
  scrollEnabled?: boolean;
}

export function CommonList({ data, scrollEnabled = true }: CommonListProp) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CommonListItem {...item} />}
      scrollEnabled={scrollEnabled}
      keyExtractor={(item) => item?._id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.7, backgroundColor: "#CBCBCB" }} />
      )}
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
    />
  );
}
