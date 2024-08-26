import { ArchiveList } from "./ArchiveList";
import { HomeRecordList } from "./HomeRecordList";
import { View } from "react-native";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getAllRecords } from "@/db/record-method";

export function HomeList() {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  // 날짜에 따른 레코드 데이터 추출
  const archiveId = useAppSelector((state) => state.calendar.currentArchive?._id);
  const records = getAllRecords();

  const filteredData = records.filter((record) => {
    if (archiveId) {
      return record.date === selectedDate && record.archive._id.toHexString() == archiveId.toHexString();
    }
    return record.date === selectedDate;
  });

  if (filteredData.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <ArchiveList />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeRecordList data={filteredData} />
    </View>
  );
}
