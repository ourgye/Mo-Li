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
    // height: "%",
    width: "100%",
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
  // calendar
  datePickerContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black0,
    overflow: "hidden",
  },
  calendarContainer: {
    backgroundColor: colors.white0,
    paddingBottom: 16,
    borderRadius: 16,
  },
  calendarSelectedDay: {
    backgroundColor: colors.blue0,
    borderWidth: 1,
    borderColor: colors.black0,
    justifyContent: "center",
  },
  customCalendarHeader: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.gray1,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    //paddingTop: 16,
  },
  dayNamesStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  customHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    //gap: 24,
  },
  customDayContainer: {
    flex: 1,
    height: 40,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  customDay: {
    textAlign: "center",
  },
});

export default styles;
