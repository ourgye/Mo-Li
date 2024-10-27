import { View, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { HomeRecordItem } from "./HomeRecordItem";
import { HomeCalendar } from "./HomeCalendar";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "./AddArchiveButton";
import ArchiveModal from "../common/ArchiveModal";
import { useCalendar } from "@/hooks/useCalendar";

export function HomeList() {
  const { currentRecords, selectedDateRecords, handleChangeCurrentArchive } =
    useCalendar();
  useEffect(() => {
    handleChangeCurrentArchive(undefined);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentRecords}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => <HomeRecordItem record={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeCalendar />}
        ListFooterComponent={
          selectedDateRecords.length > 0 ? (
            <View />
          ) : (
            <Text>{"archive button will appear... -gye"}</Text>
          )
        }
      />
    </View>
  );
}
