import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import CustomDropDown from "./ArchiveDropDown";
import SvgIcon from "../common/SvgIcon";

import styles from "./styles/HomeCalendar";
import colors from "@/assets/colors/colors";
import { useCalendar } from "@/hooks/useCalendar";
import dayjs from "dayjs";
import daysKo from "@/constants/dayko";
import { useArchive } from "@/hooks/useArchive";
import { useRealm } from "@realm/react";
import { useRecordArchiveFiltered } from "@/hooks/useRecordArchiveFilterd";
import Record from "@/db/schema/record";
import typos from "@/assets/fonts/typos";

export function HomeCalendar() {
  const realm = useRealm();
  // const archives = useArchive(realm);
  const { selectedDate, currentArchiveId, handleChangeSelectedDate } =
    useCalendar();
  const records = useRecordArchiveFiltered(realm, currentArchiveId);
  const customHeaderProps: any = useRef();
  const [currentMonth, setCurrentMonth] = useState<number>(
    dayjs(selectedDate, "YYYY-MM-DD").get("month") + 1
  );

  const recordStyle = {
    // selected: true,
    customStyles: {
      container: {
        backgroundColor: "red",
        justifyContent: "center",
      },
    },
  };

  const dotsDates: { [key: string]: any } = {};

  records.forEach((record: Record) => {
    const date: string = dayjs(record.date).format("YYYY-MM-DD");
    if (dotsDates[date] === undefined) {
      dotsDates[date] = recordStyle;
    }
    // if (dotsDates[date].dots === undefined) {
    //   dotsDates[date].dots = [];
    // }
  });

  const markedDates: any = {
    ...dotsDates,
    [selectedDate]: {
      ...dotsDates[selectedDate],
      selected: true,
      disableTouchEvent: true,
      //selectedColor: colors.blue0,
      //selectedTextColor: colors.white0,
      customStyles: {
        container: {
          backgroundColor: colors.blue0,
          borderWidth: 1,
          borderColor: colors.black0,
          justifyContent: "center",
        },
      },
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
            <Text key={day} style={typos.body2_typo}>
              {day}
            </Text>
          </View>
        ))}
      </View>
    );
  });

  const CustomHeader: React.FC = useCallback(() => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.customHeaderWrapper}>
            <View style={styles.customHeader}>
              <TouchableOpacity onPress={movePrevious}>
                <SvgIcon name="Left_icon" size={24} />
              </TouchableOpacity>
              <Text style={typos.header_typo}>
                {daysKo.monthNames[currentMonth]}
              </Text>
              <TouchableOpacity onPress={moveNext}>
                <SvgIcon name="Right_icon" size={24} />
              </TouchableOpacity>
            </View>
            <CustomDropDown />
          </View>
        </View>
      </View>
    );
  }, [currentMonth]);

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
      <CustomHeader />
      <Calendar
        // markingType={"multi-dot"}
        markingType={"custom"}
        initialDate={selectedDate}
        //theme={{ "stylesheet.calendar.main": { borderRadius: 16, header } }}
        theme={{
          todayTextColor: colors.blue0,
          dayTextColor: colors.black0,
          textDisabledColor: colors.gray3,
          textDayFontSize: 14,
          "stylesheet.calendar.header": {
            header: {
              height: 0,
            },
          },
        }}
        style={[styles.customCalendar]}
        customHeader={CustomWeek}
        onDayPress={(date: DateData) => {
          handleChangeSelectedDate(date.dateString);
        }}
        markedDates={markedDates}
        onMonthChange={(month: DateData) => {
          setCurrentMonth(new Date(month.dateString).getMonth());
        }}
      />
    </View>
  );
}
