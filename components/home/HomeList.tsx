import { ArchiveList } from "./ArchiveList";
import { HomeRecordList } from "./HomeRecordList";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getAllRecords, getRecordByArchiveDate } from "@/db/record-method";
import { useEffect, useState } from "react";
import { RecordData } from "@/constants/types.interface";

export function HomeList() {
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);

  // 날짜에 따른 레코드 데이터 추출
  const [records, setRecords] = useState<RecordData[]>(getAllRecords());

  const filteredData = records.filter((record) => {
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
