// RecordFormArchive, RecordForm 둘 다 사용
import { StyleSheet } from "react-native";

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

export default styles;
