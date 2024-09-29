import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setRecordDate, setRecordBody, selectRecordArchive, selectRecordDate, selectRecordBody } from "@/slices/archiveRecordSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./style/RecordForm";

export function RecordForm() {
  const dispatch = useAppDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const archive = useAppSelector(selectRecordArchive);
  const date = useAppSelector(selectRecordDate);
  const body = useAppSelector(selectRecordBody);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    dispatch(setRecordDate(date.toISOString().split("T")[0]));
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
        accentColor="#00CFF9"
        confirmTextIOS="확인"
        cancelTextIOS="취소"
      />
      {/* 아카이브 */}
      <View style={styles.bottomLine}>
        <Text style={[styles.text16]}>아카이브</Text>
        <Pressable
          style={[styles.inputContainer]}
          onPress={() => {
            router.navigate("./select-archive");
          }}
        >
          {/* value from state management */}
          <Text style={[styles.text16]}>{archive? archive.name: "아카이브 선택"}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* 날짜 */}
      <View style={styles.bottomLine}>
        <Text style={[styles.text16]}>날짜</Text>
        <Pressable style={[styles.inputContainer]} onPress={showDatePicker}>
          {/* value from state management */}
          <Text style={styles.text16}>{date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* 내용 */}
      <View style={[styles.bottomLine]}>
        <Text style={[styles.text16]}>내용</Text>
        <View style={[styles.inputContainer]}>
          {/* value from state management */}
          <TextInput
            editable
            multiline
            scrollEnabled
            style={[styles.text16, styles.textArea]}
            placeholder="내용을 입력해주세요"
            spellCheck={false}
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            value={body}
            onChangeText={(text) => dispatch(setRecordBody(text))}
          />
        </View>
      </View>
    </View>
  );
}