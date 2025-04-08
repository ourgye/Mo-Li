import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { HomeRecordItem } from "./HomeRecordItem";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "./AddArchiveButton";
import ArchiveModal from "../common/ArchiveModal";
import { useCalendar } from "@/hooks/useCalendar";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useNewRecord } from "@/hooks/useNewRecord";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";

export function HomeList() {
  const {
    currentArchive,
    selectedDate,
    selectedDateRecords,
    handleChangeCurrentArchive,
  } = useCalendar();
  const { recordIsThereNew, setRecordIsThereNew } = useNewRecord();
  const { archiveList, refreshing, refreshArchiveList, setRefreshing } =
    useArchiveList();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    handleChangeCurrentArchive(currentArchive, selectedDate);
  }, []);

  useEffect(() => {
    if (recordIsThereNew) {
      setRefreshing(true);
      handleChangeCurrentArchive(currentArchive, selectedDate);
      setTimeout(() => setRecordIsThereNew(false), 100);
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
          renderItem={({ item }) => {
            const archiveName = archiveList.find(
              (archive) => archive._id === item.archiveId,
            )?.name;
            return (
              <HomeRecordItem record={item} archiveName={archiveName || ""} />
            );
          }}
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
            <View>
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
              {archiveList.length === 0 && (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      textAlignVertical: "center",
                      lineHeight: 24,
                    }}
                  >
                    아카이브가 없습니다.
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      textAlignVertical: "center",
                      lineHeight: 24,
                    }}
                  >
                    상단의 <SvgIcon name="Add_white_icon" size={24} /> 버튼을
                    눌러 아카이브를 추가해주세요.
                  </Text>
                </View>
              )}
            </View>
          }
        />
      )}
    </View>
  );
}
