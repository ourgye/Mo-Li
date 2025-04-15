import { FlatList, View, Pressable, Text } from "react-native";

import styles from "../common/style/CommonList";
import { useRecordForm } from "@/hooks/useRecordForm";
import { useEffect } from "react";
import { useArchive } from "@/hooks/useArchive";
import { useRealm } from "@realm/react";
import Archive from "@/db/schema/archive";
import dayjs from "dayjs";

interface ArchiveSelectListItemProps {
  selectedId: string;
  data: Archive;
  setSelected: () => void;
}

export function ArchiveSelectList({ modalVisible }: { modalVisible: boolean }) {
  const realm = useRealm();
  const archive = realm.objects(Archive);
  const { recordArchive, setRecordArchive } = useRecordForm();

  const handleSelectArchive = (item: Archive) => {
    setRecordArchive(item);
  };

  return (
    <FlatList
      data={archive}
      renderItem={({ item }) => (
        <ArchiveSelectListItem
          key={`${item._id}`}
          data={item}
          selectedId={recordArchive?._id.toString() ?? ""}
          setSelected={() => handleSelectArchive(item)}
        />
      )}
      scrollEnabled={true}
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
            selectedId === data._id.toString() && { color: "#00CFF9" },
          ]}
        >
          {data.name}
        </Text>
        <Text>
          {data.count
            ? data.count + "개 | " + dayjs(data.lastDate).format("YYYY-MM-DD")
            : "컨텐츠가 없습니다"}
        </Text>
      </View>
    </Pressable>
  );
};
