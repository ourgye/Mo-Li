import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { HomeRecordItem } from "./HomeRecordItem";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "./AddArchiveButton";
import ArchiveModal from "../common/ArchiveModal";
import { useCalendar } from "@/hooks/useCalendar";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import typos from "@/assets/fonts/typos";

export function HomeList() {
  const {
    currentArchive,
    selectedDate,
    selectedDateRecords,
    handleChangeCurrentArchive,
  } = useCalendar();
  const { recordIsThereNew, setRecordIsThereNew } = useHomeNewRecord();
  const { archiveList, refreshing, refreshArchiveList, setRefreshing } =
    useArchiveList();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    handleChangeCurrentArchive(currentArchive, selectedDate);
  }, []);

  useEffect(() => {
    if (recordIsThereNew) {
      handleChangeCurrentArchive(currentArchive, selectedDate);
      setRecordIsThereNew(false);
    }
  }, [recordIsThereNew]);

  useEffect(() => {
    if (refreshing) {
      refreshArchiveList();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
      <ArchiveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {selectedDateRecords.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={selectedDateRecords}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <HomeRecordItem record={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={archiveList}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <ArchiveListItem archive={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                height: 52,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={typos.subtitle1_typo}>나의 아카이브</Text>
              <View>
                <AddArchiveButton setModalVisible={setModalVisible} />
              </View>
            </View>
          }
        />
      )}
    </View>
  );
}
