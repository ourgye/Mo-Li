import { FlatList, View, StyleSheet } from "react-native";
import { ArchiveItem } from "./ArchiveItem";
import ObjectID from "bson-objectid";
import { ArchiveData, ArchiveDataAll } from "@/constants/types.interface";
import { useEffect, useState } from "react";
import { getAllArchives } from "@/db/archive-method";

export function ArchiveList({
  current,
  onPress,
}: {
  current: ArchiveData | undefined;
  onPress: (current: ArchiveData) => void;
}) {
  const [data, setData] = useState<ArchiveDataAll[]>(getAllArchives());
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => (
        <ArchiveItem
          isSelected={current && current._id == item._id}
          data={item}
          onPress={() => item} // 지금은 누르면 이름으로 변경하게 되어 있지만 나중에는 누르면 해당 아카이브로 이동하게 변경
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 0.7,
            backgroundColor: "#CBCBCB",
            marginHorizontal: 16,
          }}
        />
      )}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
  },
});
