import { FlatList, View, Pressable, Text } from "react-native";

import styles from "../common/style/CommonList";
import { ArchiveType } from "@/constants/types.interface";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import { useEffect } from "react";

interface ArchiveSelectListItemProps {
  selectedId: string;
  setSelected: () => any;
  data: ArchiveType;
}

const ArchiveSelectListItem = ({
  selectedId,
  setSelected,
  data,
}: ArchiveSelectListItemProps) => {
  return (
    <Pressable onPress={setSelected} style={styles.itemContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        }}
      >
        <Text
          style={[
            styles.title,
            selectedId === data._id && { color: "#00CFF9" },
          ]}
        >
          {data.name}
        </Text>
        <Text>
          {data.count != 0
            ? data.count + "개 | " + data.lastDate
            : "컨텐츠가 없습니다"}
        </Text>
      </View>
    </Pressable>
  );
};

export function ArchiveSelectList({ modalVisible }: { modalVisible: boolean }) {
  const { archiveList, refreshing, refreshArchiveList } = useArchiveList();
  const { newRecordArchive, setRecordArchive } = useHomeNewRecord();

  const handleSelectArchive = (archive: ArchiveType) => {
    setRecordArchive({ id: archive._id, name: archive.name });
  };

  return (
    <FlatList
      data={archiveList}
      renderItem={({ item }) => (
        <ArchiveSelectListItem
          key={`${item._id}`}
          data={item}
          selectedId={newRecordArchive.id || ""}
          setSelected={() => handleSelectArchive(item)}
        />
      )}
      scrollEnabled={true}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{ height: 0.7, backgroundColor: "#CBCBCB" }} />
      )}
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
    />
  );
}
