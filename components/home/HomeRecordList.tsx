import { FlatList, StyleSheet, View } from "react-native";
import { HomeRecordItem } from "./HomeRecordItem";
import { HomeCalendar } from "./HomeCalendar";
import { RecordData } from "@/constants/types.interface";

export function HomeRecordList({data}: {data: RecordData[]}) {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <HomeRecordItem {...item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<HomeCalendar />}
      ListFooterComponent={<View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({});
