import { FlatList, StyleSheet, View } from "react-native";
import { HomeRecordItem, type RecordItemData } from "./HomeRecordItem";
import { HomeCalendar, type HomeCalendarProps } from "./HomeCalendar";

type HomeRecordListProps = {
  data: RecordItemData[];
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
