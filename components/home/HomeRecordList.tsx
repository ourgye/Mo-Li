import { FlatList, StyleSheet, View } from "react-native";
import { HomeRecordItem } from "./HomeRecordItem";
import { RecordData } from "@/constants/types.interface";
import { HomeCalendar, type HomeCalendarProps } from "./HomeCalendar";
import { Results } from "realm";

type HomeRecordListProps = {
  data: RecordData[];
  calendarProps: HomeCalendarProps;
};

export function HomeRecordList({ data, calendarProps }: HomeRecordListProps) {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <HomeRecordItem {...item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<HomeCalendar {...calendarProps}/>}
      ListFooterComponent={<View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({});
