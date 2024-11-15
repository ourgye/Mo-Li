import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import styles from "./style/RecordForm";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";

export function RecordForm({}: {}) {
  const {
    newRecordDate,
    newRecordArchive,
    newRecordBody,
    setRecordArchive,
    setRecordDate,
    setRecordBody,
  } = useHomeNewRecord();
  const date = new Date().toISOString().split("T")[0];
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
    setRecordDate(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={new Date(date)}
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
        <Text style={typos.subtitle_typo}>아카이브</Text>
        <Pressable
          style={styles.inputContainer}
          onPress={() => {
            router.navigate("./select-archive");
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
        <Text style={typos.subtitle_typo}>날짜</Text>
        <Pressable style={styles.inputContainer} onPress={showDatePicker}>
          <Text style={typos.body1_typo}>{newRecordDate}</Text>
          <SvgIcon name="Select_yellow_icon" size={20} />
        </Pressable>
      </View>
      {/* ============================== 내용 ============================== */}
      <View style={styles.bottomLine}>
        <Text style={typos.subtitle_typo}>내용</Text>
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
