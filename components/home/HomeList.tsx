import { ArchiveList } from "./ArchiveList";
import { HomeRecordList } from "./HomeRecordList";
import { View } from "react-native";
import { useMemo, useState } from "react";
import { CalendarUtils } from "react-native-calendars";
import { getRecordByDate } from "@/db/record-method";
import { getArchiveData } from "@/db/archive-method";
import { ArchiveData } from "@/constants/types.interface";
import { ObjectId } from "bson";

export function HomeList() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentArchive, setCurrentArchive] = useState<ArchiveData>({
    _id: new ObjectId(),
    name: "전체",
  });

  const data = getRecordByDate(selectedDate);
  const dropDownData = getArchiveData();

  const markedDates = useMemo(() => {
    return {
      [CalendarUtils.getCalendarDateString(selectedDate)]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#00CFF9",
        selectedTextColor: "white",
      },
    };
  }, [selectedDate]);

  // 날짜에 맞는 레코드 데이터 추출
  // item.date(yyyy.mm.dd) === selectedDate(yyyy-mm-dd)인 데이터만 추출
  return (
    <View style={{ flex: 1 }}>
      {data.length > 0 ? (
        <HomeRecordList
          data={data}
          calendarProps={{
            markedDates,
            selectedDate,
            setSelectedDate,
            dropDownData,
            currentArchive,
            setCurrentArchive,
          }}
        />
      ) : (
        <ArchiveList
          markedDates={markedDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dropDownData={dropDownData}
          currentArchive={currentArchive}
          setCurrentArchive={setCurrentArchive}
        />
      )}
    </View>
  );
}
