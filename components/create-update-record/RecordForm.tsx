import { router } from "expo-router";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, DateData } from "react-native-calendars";
import { useRealm } from "@realm/react";
import dayjs from "dayjs";

import { useRecordForm } from "@/hooks/useRecordForm";
import styles from "./style/RecordForm";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import RecordFormImage from "./RecordFormImage";
import CreateRecordHeader from "./CreateRecordHeader";
import Record from "@/db/schema/record";
import { saveImage2File } from "@/utils/saveImage2File";
import { createNewRecord, updateRecord } from "@/db/crud/record-method";
import {
  updateArchiveCount,
  updateArchiveLastDate,
} from "@/db/crud/archive-method";
import ModifyRecordHeader from "./ModifyRecordHeader";
import { deleteImageAll } from "@/utils/deleteImageAll";
import daysKo from "@/constants/dayko";

export function RecordForm({
  modify = false,
  recordId,
}: {
  modify?: boolean;
  recordId?: Realm.BSON.UUID;
}) {
  const realm = useRealm();
  const {
    recordWhole,
    recordDate,
    recordBody,
    recordImageRatio,
    recordImagePath,
    recordArchive,
    setRecordDate,
    setRecordBody,
    setInitiailState,
  } = useRecordForm();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(recordDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const checkRecordForm = () => {
    if (
      !recordWhole.imagePath.length ||
      !recordArchive ||
      !recordBody ||
      !recordDate
    ) {
      return setButtonEnable(false);
    }
    return setButtonEnable(true);
  };

  const createRecord = () => {
    // 사진 있는 지 확인
    if (!recordWhole.imagePath.length) {
      throw new Error("사진을 선택해주세요");
    }
    // 아카이브 있는 지 확인
    if (!recordArchive) {
      throw new Error("아카이브를 선택해주세요");
    }
    // 내용 있는 지 확인
    if (!recordBody) {
      throw new Error("내용을 입력해주세요");
    }
    // 날짜 있는 지 확인
    if (!recordDate) {
      throw new Error("날짜를 선택해주세요");
    }

    const record = Record.generate(
      recordDate,
      [],
      recordImageRatio,
      recordBody,
    );
    const createRec = async () => {
      const imagePath = await saveImage2File(
        recordWhole.imagePath,
        record._id.toString(),
      );

      console.log("[DEBUG] imagePath", imagePath);
      if (imagePath) {
        record.imagePath = imagePath;
      }

      if (recordArchive && imagePath) {
        createNewRecord(realm, record as Record, recordArchive);
        updateArchiveCount(realm, recordArchive._id as Realm.BSON.UUID);
        updateArchiveLastDate(realm, recordArchive._id as Realm.BSON.UUID);
      }
    };
    createRec();
    setInitiailState();
  };

  const modifyRecord = (recordId: Realm.BSON.UUID) => {
    const record = realm.objectForPrimaryKey<Record>(Record, recordId);

    // 사진 있는 지 확인
    if (!recordWhole.imagePath.length) {
      throw new Error("사진을 선택해주세요");
    }
    // 아카이브 있는 지 확인
    if (!recordArchive) {
      throw new Error("아카이브를 선택해주세요");
    }
    // 내용 있는 지 확인
    if (!recordBody) {
      throw new Error("내용을 입력해주세요");
    }
    // 날짜 있는 지 확인
    if (!recordDate) {
      throw new Error("날짜를 선택해주세요");
    }

    let imagePath: string[] = [];
    const updateRec = async () => {
      if (recordImagePath && record) {
        const toBeDeleted = record.imagePath.filter(
          (path) => !recordImagePath.includes(path),
        );
        const deleteSuccess = await deleteImageAll(toBeDeleted);
        if (!deleteSuccess) {
          throw new Error("사진 삭제 실패");
        }
        imagePath = await saveImage2File(
          recordWhole.imagePath,
          recordId.toString(),
        );
      }

      console.log("[DEBUG] imagePath", imagePath);
      if (imagePath.length === 0) {
        imagePath = recordImagePath;
      }

      if (recordArchive && imagePath) {
        updateRecord(
          realm,
          recordId,
          recordDate,
          imagePath,
          recordImageRatio,
          recordBody,
        );
      }
    };
    updateRec();
    setInitiailState();
  };

  useEffect(() => {
    checkRecordForm();
  }, [recordWhole]);

  const CustomCalendarPicker = () => {
    // calendar varaiables and functions, it renders too much. selectedDate 바뀔때마다 렌더링됨
    const selectedDateString = dayjs(selectedDate).format("YYYY-MM-DD");
    const [currentMonth, setCurrentMonth] = useState<number>(
      dayjs(selectedDate, "YYYY-MM-DD").get("month"),
    );
    const customHeaderProps: any = useRef();

    const handleDayPress = (day: DateData) => {
      console.log(day);
      const selectedDay = dayjs(day.dateString).startOf("day").toDate();
      setSelectedDate(selectedDay);
    };

    const markedDates = {
      [selectedDateString]: {
        selected: true,
        disableTouchEvent: true,
        customStyles: {
          container: styles.calendarSelectedDay,
        },
      },
    };

    const calendarTheme = useMemo(
      () => ({
        todayTextColor: colors.blued1,
        dayTextColor: colors.black0,
        textDisabledColor: colors.gray3,
        textDayFontSize: 14,
      }),
      [],
    );

    const setCustomHeaderNewMonth = useCallback((next = false) => {
      console.log("setCustomHeaderNewMonth", next);
      const add = next ? 1 : -1;
      const month = new Date(customHeaderProps?.current?.month);
      const newMonth = new Date(month.setMonth(month.getMonth() + add));
      customHeaderProps?.current?.addMonth(add);
      setCurrentMonth(newMonth.getMonth());
    }, []);

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

    const CustomWeek = React.forwardRef((props, ref) => {
      customHeaderProps.current = props;
      return (
        // @ts-expect-error
        <View ref={ref} {...props}>
          <View style={styles.customHeader}>
            <TouchableOpacity onPress={movePrevious}>
              <SvgIcon name="Left_icon" size={24} fill={colors.blue0} />
            </TouchableOpacity>
            <Text style={typos.header_typo}>
              {daysKo.monthNames[currentMonth]}
            </Text>
            <TouchableOpacity onPress={moveNext}>
              <SvgIcon name="Right_icon" size={24} fill={colors.blue0} />
            </TouchableOpacity>
          </View>
          <DayNames />
        </View>
      );
    });

    return (
      <Calendar
        initialDate={selectedDateString}
        markingType="custom"
        style={styles.calendarContainer}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={calendarTheme}
        customHeader={CustomWeek}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: "100%" }}>
        {modify ? (
          <ModifyRecordHeader
            modifyRecord={() => (recordId ? modifyRecord(recordId) : null)}
            buttonEnable={buttonEnable}
          />
        ) : (
          <CreateRecordHeader
            createRecord={createRecord}
            buttonEnable={buttonEnable}
          />
        )}
        <RecordFormImage modify />
        <DateTimePickerModal
          // style={{ flex: 1}}
          // ======= styles ======
          accentColor={colors.blued1}
          confirmTextIOS="확인"
          cancelTextIOS="취소"
          textColor={colors.black0}
          pickerContainerStyleIOS={styles.datePickerContainer}
          customPickerIOS={() => <CustomCalendarPicker />}
          // =====================
          isVisible={isDatePickerVisible}
          mode="date"
          display="inline"
          date={selectedDate}
          onChange={(date: Date) => {
            setSelectedDate(date);
          }}
          onConfirm={(date: Date) => {
            setRecordDate(selectedDate);
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
          locale="ko_KR"
        />
        {/* 폼 */}
        <View style={[styles.container]}>
          {/*============================== 아카이브  ==============================*/}
          <View style={styles.bottomLine}>
            <Text style={typos.subtitle1_typo}>아카이브</Text>
            <Pressable
              style={styles.inputContainer}
              onPress={() => {
                router.navigate("/select-archive");
              }}
            >
              {/* value from state management */}
              <Text style={typos.body1_typo}>
                {(recordArchive && recordArchive.name) ?? "아카이브 선택"}
              </Text>
              <SvgIcon name="Select_icon" size={20} />
            </Pressable>
          </View>
          {/* ============================== 날짜 ============================== */}
          <View style={styles.bottomLine}>
            <Text style={typos.subtitle1_typo}>날짜</Text>
            <Pressable style={styles.inputContainer} onPress={showDatePicker}>
              <Text style={typos.body1_typo}>
                {dayjs(recordDate).format("YYYY-MM-DD")}
              </Text>
              <SvgIcon name="Select_icon" size={20} />
            </Pressable>
          </View>
          {/* ============================== 내용 ============================== */}
          <View style={[styles.bottomLine, { flex: 1 }]}>
            <Text style={typos.subtitle1_typo}>내용</Text>
            <View style={styles.inputContainer}>
              {/* value from state management */}
              <TextInput
                editable
                multiline
                scrollEnabled
                style={[typos.body1_typo, styles.textArea]}
                placeholder="내용을 입력해주세요"
                spellCheck={false}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={recordBody}
                onChangeText={setRecordBody}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
