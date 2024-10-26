// 메인 페이지에 나오는 캘린더
// 앱 부팅시 캘린더에 오늘 날짜 표시
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { CustomDropDown } from "./ArchiveDropDown";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  setSelectedDate,
  selectCurrentArchive,
  selectSelectedDate,
} from "@/slices/calendarSlice";
import { setRecordDate } from "@/slices/homeRecordSlice";
import SvgIcon from "../common/SvgIcon";

import styles from "./styles/HomeCalendar";

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

export function HomeCalendar({ records }: { records: any }) {
  const dispatch = useAppDispatch();
  const customHeaderProps: any = useRef();
  const selectedDate = useAppSelector(selectSelectedDate);
  const currentArchive = useAppSelector(selectCurrentArchive);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date(selectedDate).getMonth()
  ); // for printing month name in header

  const recordStyle = { color: "grey", selectedDotColor: "white" };
  // get all the record from dbs

  const dotsDates: { [key: string]: any } = {};

  records.forEach((record: { date: string }) => {
    const date: string = record.date;
    if (dotsDates[date] === undefined) {
      dotsDates[date] = {};
    }
    if (dotsDates[date].dots === undefined) {
      dotsDates[date].dots = [];
    }
    dotsDates[date].dots.push(recordStyle);
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

  const CustomHeader = React.forwardRef((props, ref) => {
    customHeaderProps.current = props;

    return (
      // @ts-expect-error
      <View ref={ref} {...props}>
        <View style={styles.customHeaderWrapper}>
          <View style={styles.customHeader}>
            <TouchableOpacity onPress={movePrevious}>
              <SvgIcon name="Left_icon" size={24} />
            </TouchableOpacity>
            <Text style={styles.customHeaderText}>
              {daysKo.monthNames[currentMonth]}
            </Text>
            <TouchableOpacity onPress={moveNext}>
              <SvgIcon name="Right_icon" size={24} />
            </TouchableOpacity>
          </View>
          <CustomDropDown />
        </View>
      </View>
    );
  });

  const CustomWeek = React.forwardRef((props, ref) => {
    customHeaderProps.current = props;

    return (
      // @ts-expect-error
      <View ref={ref} {...props}>
        <DayNames />
      </View>
    );
  });

  return (
    <View>
      <Calendar
        theme={{
          "stylesheet.calendar.main": {
            monthView: {
              height: 0,
            },
          },
        }}
        customHeader={CustomHeader}
        style={[styles.customCalendarHeader]}
      />
      <Calendar
        markingType={"multi-dot"}
        initialDate={selectedDate}
        //theme={{ "stylesheet.calendar.main": { borderRadius: 16, header } }}
        theme={{
          "stylesheet.calendar.header": {
            header: {
              height: 0,
            },
          },
        }}
        style={[styles.customCalendar]}
        customHeader={CustomWeek}
        onDayPress={(date: any) => {
          dispatch(setSelectedDate(date.dateString));
          dispatch(setRecordDate(date.dateString));
        }}
        markedDates={markedDates}
        onMonthChange={(month: DateData) => {
          setCurrentMonth(new Date(month.dateString).getMonth());
        }}
      />
    </View>
  );
}
