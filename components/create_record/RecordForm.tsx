import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";

export function RecordForm() {
  return (
    <View style={styles.container}>
    <View style={styles.bottomLine}>
        <Text style={[styles.text16]}>아카이브</Text>
        <Pressable style={[styles.inputContainer]}>
          {/* value from state management */}
          <Text style={[styles.text16]}>하이랄 구하기</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <View style={styles.bottomLine}>
        <Text style={[styles.text16]}>날짜</Text>
        <Pressable style={[styles.inputContainer]}>
          {/* value from state management */}
          <Text style={styles.text16}>2024-08-03</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <View style={[styles.bottomLine]}>
        <Text style={[styles.text16]}>내용</Text>
        <View style={[styles.inputContainer]}>
          {/* value from state management */}
          <TextInput
            editable
            multiline
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
    height: 164
  }
});
