import { ArchiveList } from "./ArchiveList";
import { HomeRecordList } from "./HomeRecordList";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getAllRecords, getRecordByArchiveDate } from "@/db/record-method";

export function HomeList() {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const currentArchive = useAppSelector(
    (state) => state.calendar.currentArchive,
  );

  // 날짜에 따른 레코드 데이터 추출
  const records = getAllRecords();
  const filteredData = records.filter((record) => {
    return record.date === selectedDate;
  });

  return (
    <View style={{ flex: 1 }}>
      {filteredData.length > 0 ? (
        <HomeRecordList data={filteredData} />
      ) : (
        <ArchiveList />
      )}
    </View>
  );
}
