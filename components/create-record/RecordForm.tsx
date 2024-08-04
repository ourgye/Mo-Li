import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function RecordForm() {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={date}
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
          <Text style={[styles.text16]}>하이랄 구하기</Text>
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
          <Text style={styles.text16}>{date.toISOString().split("T")[0]}</Text>
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
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
    borderRadius: 16,
    gap: 16,
    overflow: "hidden",
  },
  text16: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#CBCBCB",
  },
  textArea: {
    height: 164,
    flex: 1,
  },
});
