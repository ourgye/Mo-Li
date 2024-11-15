import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./style/RecordForm";
import typos from "@/assets/fonts/typos";

export function RecordForm() {
  const date = new Date().toISOString().split("T")[0];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
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
        <Text style={typos.body1_typo}>아카이브</Text>
        <Pressable
          style={[styles.inputContainer]}
          onPress={() => {
            router.navigate("./select-archive");
          }}
        >
          {/* value from state management */}
          <Text style={typos.body1_typo}>
            {/* {archive ? archive.name : "아카이브 선택"} */}
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* 날짜 */}
      <View style={styles.bottomLine}>
        <Text style={typos.body1_typo}>날짜</Text>
        <Pressable style={[styles.inputContainer]} onPress={showDatePicker}>
          {/* value from state management */}
          <Text style={typos.body1_typo}>{date}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {/* 내용 */}
      <View style={[styles.bottomLine]}>
        <Text style={typos.body1_typo}>내용</Text>
        <View style={[styles.inputContainer]}>
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
            // value={body}
            // onChangeText={(text) => dispatch(setRecordBody(text))}
          />
        </View>
      </View>
    </View>
  );
}
