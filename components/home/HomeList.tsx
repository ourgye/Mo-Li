import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { HomeRecordItem } from "./HomeRecordItem";
import { HomeCalendar } from "./HomeCalendar";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "./AddArchiveButton";
import ArchiveModal from "../common/ArchiveModal";
import { useCalendar } from "@/hooks/useCalendar";
import { useArchiveList } from "@/hooks/useArchiveList";
import typos from "@/assets/fonts/typos";

export function HomeList() {
  const {
    currentArchive,
    selectedDate,
    selectedDateRecords,
    handleChangeCurrentArchive,
  } = useCalendar();
  const { archiveList } = useArchiveList();

  useEffect(() => {
    handleChangeCurrentArchive(currentArchive, selectedDate);
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
              <Text style={typos.subtitle_typo}>나의 아카이브</Text>
              <View>
                <AddArchiveButton
                  onPress={() => {
                    console.log("add archive button pressed");
                  }}
                />
              </View>
            </View>
          }
        />
      )}
    </View>
  );
}
