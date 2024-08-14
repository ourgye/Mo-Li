// 메인 페이지에 나오는 캘린더
// 앱 부팅시 캘린더에 오늘 날짜 표시
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { Dimensions } from "react-native";
import { CustomDropDown } from "../CustomDropDown";
import { ArchiveData } from "@/constants/types.interface";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setSelectedDate, setCurrentArchive } from "@/slices/calendarSlice";
import { getAllRecords } from "@/db/record-method";

const daysKo = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};

export type HomeCalendarProps = {
  dropDownData: ArchiveData[] | null;
};

export function HomeCalendar() {
  const dispatch = useAppDispatch();
  const customHeaderProps: any = useRef();
  const selectedDate = useAppSelector((state) => state.calendar.selectedDate);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date(selectedDate).getMonth(),
  ); // for printing month name in header

  const records = {color: "grey", selectedDotColor: "white" };
  // get all the record from db
  const allRecords = getAllRecords();
  // set marked dates for the calendar

  const dotsDates: { [key: string]: any } = {};
  // use memo?
  allRecords.forEach((record: { date: string }) => {
    const date: string = record.date;
    if (dotsDates[date] === undefined) {
      dotsDates[date] = {};
    }
    if (dotsDates[date].dots === undefined) {
      dotsDates[date].dots = [];
    }
    dotsDates[date].dots.push(records);
  });

  const markedDates: any = {
    ...dotsDates,
    [selectedDate]: {
      ...dotsDates[selectedDate],
      selected: true,
      disableTouchEvent: true,
      selectedColor: "#00CFF9",
      selectedTextColor: "white",
    },
  };

  const setCustomHeaderNewMonth = (next = false) => {
    const add = next ? 1 : -1;
    const month = new Date(customHeaderProps?.current?.month);
    const newMonth = new Date(month.setMonth(month.getMonth() + add));
    customHeaderProps?.current?.addMonth(add);
    setCurrentMonth(newMonth.getMonth());
  };

  const moveNext = () => {
    setCustomHeaderNewMonth(true);
  };

  const movePrevious = () => {
    setCustomHeaderNewMonth(false);
  };

  const DayNames = React.memo(() => {
    return (
      <View style={styles.dayNamesStyle}>
        {daysKo.dayNamesShort.map((day) => (
          <View key={day} style={styles.customDayContainer}>
            <Text key={day} style={styles.customDay}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    );
  });

  const renderCalendarWithCustomHeader = () => {
    const CustomHeader = React.forwardRef((props, ref) => {
      customHeaderProps.current = props;

      return (
        // @ts-expect-error
        <View ref={ref} {...props}>
          <View style={styles.customHeaderWrapper}>
            <View style={styles.customHeader}>
              <TouchableOpacity onPress={movePrevious}>
                <MaterialCommunityIcons name="chevron-left" size={24} />
              </TouchableOpacity>
              <Text style={styles.customHeaderText}>
                {daysKo.monthNames[currentMonth]}
              </Text>
              <TouchableOpacity onPress={moveNext}>
                <MaterialCommunityIcons name="chevron-right" size={24} />
              </TouchableOpacity>
            </View>
            <CustomDropDown />
          </View>
          <DayNames />
        </View>
      );
    });

    return (
      <Calendar
        markingType={"multi-dot"}
        initialDate={selectedDate}
        theme={{ "stylesheet.calendar.main": { borderRadius: 16 } }}
        style={[styles.customCalendar]}
        customHeader={CustomHeader}
        onDayPress={(date: any) => {
          dispatch(setSelectedDate(date.dateString));
        }}
        markedDates={markedDates}
      />
    );
  };

  return <View>{renderCalendarWithCustomHeader()}</View>;
}

// style, 임시 마음대로 변경 가능
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  customCalendar: {
    width: width - 48,
    backgroundColor: "#f8f8f8",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    paddingBottom: 16,
  },
  dayNamesStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    marginHorizontal: -4,
    padding: 8,
  },
  customHeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  customHeaderText: {
    fontSize: 24,
  },
  customDayContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  customDay: {
    textAlign: "center",
  },
  disabledText: {
    color: "grey",
  },
  defaultText: {
    color: "purple",
  },
});
