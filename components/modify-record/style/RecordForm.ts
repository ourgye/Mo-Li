// RecordFormArchive, RecordForm 둘 다 사용
import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //height: "100%",
    backgroundColor: colors.white0,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
    overflow: "hidden",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray3,
  },
  textArea: {
    //height: 164,
    height: "auto",
    flex: 1,
  },
  recordImage: {
    backgroundColor: colors.white0,
    width: 240,
    // fixed width
    //width: 234,
    // temp height
    // height: 234,
    alignSelf: "center",
    overflow: "hidden",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 24,
  },
});

export default styles;
