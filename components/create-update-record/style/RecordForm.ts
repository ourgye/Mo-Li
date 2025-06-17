// RecordFormArchive, RecordForm 둘 다 사용
import colors from "@/assets/colors/colors";
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white0,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
    marginVertical: 24,
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
    height: "100%",
    // height: Dimensions.get("window").height / 4,
  },
  recordImage: {
    backgroundColor: colors.white0,
    width: Dimensions.get("window").height / 4,
    height: Dimensions.get("window").height / 4,
    alignSelf: "center",
    overflow: "hidden",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default styles;
