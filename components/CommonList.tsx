// 아카이브 선택
// 아카이즈 수정 및 삭제(내 정보 안에 있는)
// 내 정보 에서 사용

import { FlatList, StyleSheet, View } from "react-native";
import { CommonListItem, type CommonListItemProps } from "./CommonListItem";
import { useState } from "react";

export function CommonList({ data, scrollEnabled=true }: { data: CommonListItemProps[], scrollEnabled?: boolean }) {
  const [selected, setSelected] = useState<string | null>(data[0].title || null);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CommonListItem
          {...item}
          setSelected={setSelected}
          selected={item.title === selected}
        />
      )}
      scrollEnabled={scrollEnabled}
      keyExtractor={(item) => item.title}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.7, backgroundColor: "#CBCBCB" }} />
      )}
      contentContainerStyle={styles.container}
      style={{flex: 1}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
});
