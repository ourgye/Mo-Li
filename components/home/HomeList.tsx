import { View, FlatList } from "react-native";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { HomeRecordItem } from "./HomeRecordItem";
import { HomeCalendar } from "./HomeCalendar";
import { ArchiveDataWithRecentDateWORecords } from "@/constants/types.interface";
import { ArchiveListItem } from "./HomeArchiveListItem";
import ArchiveModal from "../common/ArchiveModal";
import { AddArchiveButton } from "./AddArchiveButton";

export function HomeList({ data }: { data: any[] }) {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const archiveId = useAppSelector(
    (state) => state.calendar.currentArchive?._id,
  );
  const archiveList: ArchiveDataWithRecentDateWORecords[] = [];
  const [visibleModal, setVisibleModal] = useState(false);
  const filteredRecordArchive = data.filter((record) => {
    if (archiveId)
      return record.archive._id.toHexString() === archiveId.toHexString();
    return record;
  });
  const filteredRecordDate = data.filter((record) => {
    if (archiveId)
      return (
        record.archive._id.toHexString() === archiveId.toHexString() &&
        record.date === selectedDate
      );
    return record.date === selectedDate;
  });

  return (
    <View style={{ flex: 1 }}>
      {filteredRecordDate.length ? (
        <FlatList
          data={filteredRecordDate}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <HomeRecordItem {...item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<HomeCalendar records={filteredRecordArchive} />}
          ListFooterComponent={<View style={{ height: 16 }} />}
        />
      ) : (
        <FlatList
          ListHeaderComponent={<HomeCalendar records={filteredRecordArchive} />}
          data={archiveList}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <ArchiveListItem item={item} onPress={() => {}} />
          )}
          keyExtractor={(item) => item._id.toHexString()}
          ListFooterComponent={
            <View>
              <ArchiveModal
                modalVisible={visibleModal}
                setModalVisible={setVisibleModal}
              />
              <AddArchiveButton
                onPress={() => {
                  setVisibleModal(true);
                }}
              />
            </View>
          }
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
