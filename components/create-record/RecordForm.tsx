import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import styles from "./style/RecordForm";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import dayjs from "dayjs";

export function RecordForm() {
  const {
    newRecordDate,
    newRecordArchive,
    newRecordBody,
    setRecordDate,
    setRecordBody,
  } = useHomeNewRecord();

  // const {
  //   newRecordDate: newRecordDate_c,
  //   newRecordArchive: newRecordArchive_c,
  //   newRecordBody: newRecordBody_c,
  //   setRecordDate: setRecordDate_c,
  //   setRecordBody: setRecordBody_c,
  // } = useHomeNewRecord();

  // const {
  //   newRecordDate: newRecordDate_a,
  //   newRecordArchive: newRecordArchive_a,
  //   newRecordBody: newRecordBody_a,
  //   setRecordDate: setRecordDate_a,
  //   setRecordBody: setRecordBody_a,
  // } = useArchiveNewRecord();

  // const records = {
  //   home: {
  //     newRecordDate: newRecordDate_c,
  //     newRecordArchive: newRecordArchive_c,
  //     newRecordBody: newRecordBody_c,
  //     setRecordDate: setRecordDate_c,
  //     setRecordBody: setRecordBody_c,
  //   },
  //   archive: {
  //     newRecordDate: newRecordDate_a,
  //     newRecordArchive: newRecordArchive_a,
  //     newRecordBody: newRecordBody_a,
  //     setRecordDate: setRecordDate_a,
  //     setRecordBody: setRecordBody_a,
  //   },
  // };
  // const {
  //   newRecordDate,
  //   newRecordArchive,
  //   newRecordBody,
  //   setRecordDate,
  //   setRecordBody,
  // } = records[type];

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const handleRecordBodyChange = (text: string) => {
    setRecordBody(text);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log(date);
    setRecordDate(dayjs(date).format("YYYY-MM-DDTHH:mm:ss"));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={dayjs().toDate()}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ko_KR"
        accentColor={colors.blue0}
        confirmTextIOS="확인"
        cancelTextIOS="취소"
      />
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
            {newRecordArchive.name ? newRecordArchive.name : "아카이브 선택"}
          </Text>
          <SvgIcon name="Select_yellow_icon" size={20} />
        </Pressable>
      </View>
      {/* ============================== 날짜 ============================== */}
      <View style={styles.bottomLine}>
        <Text style={typos.subtitle1_typo}>날짜</Text>
        <Pressable style={styles.inputContainer} onPress={showDatePicker}>
          <Text style={typos.body1_typo}>{newRecordDate.split("T")[0]}</Text>
          <SvgIcon name="Select_yellow_icon" size={20} />
        </Pressable>
      </View>
      {/* ============================== 내용 ============================== */}
      <View style={styles.bottomLine}>
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
            value={newRecordBody}
            onChangeText={handleRecordBodyChange}
          />
        </View>
      </View>
    </View>
  );
}
