import { ArchiveList } from "./ArchiveList";
import { HomeRecordList } from "./HomeRecordList";
import { View } from "react-native";
import { useMemo, useState } from "react";
import { CalendarUtils } from "react-native-calendars";
import { RecordItemData } from "./HomeRecordItem";
import { type DropdownItem } from "./CalendarDropDown";

// hard coded data: 3 (from flow) for now
const wholeData: RecordItemData[] = [
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300",
    title: "하이랄 정복기",
    body: "젤다 공주님을 구하러 떠났다. 그런데 아무리 생각해도 민희는 젤다를 너무 못한다. 젤다 뿐만 아니라 그냥 모든 게임을 그리고 엑셀도 못한다. 정말 둘 다 열심히하길 바란다! 이만, 끝.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300/200",
    title: "귀농 in 스타듀밸리",
    body: "귀농은 끝나지 않는다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
];

// hardcoded data for now
const dropDownData: DropdownItem[] = [
  { label: "전체", value: "0" },
  { label: "하이랄 정복기", value: "1" },
  { label: "귀농 in 스타듀밸리", value: "2" },
  { label: "가포는 최고의 호랑이", value: "3" },
];

export function HomeList() {
  const [selectedDate, setSelectedDate] = useState(
    CalendarUtils.getCalendarDateString(new Date()),
  );
  const [currentArchive, setCurrentArchive] = useState<DropdownItem>(
    dropDownData[0],
  );
  const markedDates = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#00CFF9",
        selectedTextColor: "white",
      },
    };
  }, [selectedDate]);

  // 날짜에 맞는 레코드 데이터 추출
  // item.date(yyyy.mm.dd) === selectedDate(yyyy-mm-dd)인 데이터만 추출
  const data: RecordItemData[] = useMemo(() => {
    return wholeData.filter(
      (item) => item.date === selectedDate.split("-").join("."),
    );
  }, [selectedDate]);

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
