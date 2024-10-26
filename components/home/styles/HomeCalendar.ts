import { Dimensions, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  customCalendar: {
    width: width - 48,
    backgroundColor: colors.white0,
    //alignContent: "flex-start",
    //justifyContent: "flex-start",
    //paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  customCalendarHeader: {
    width: width - 48,
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
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    //gap: 24,
  },
  customHeaderWrapper: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  customHeaderText: {
    fontSize: 24,
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
  disabledText: {
    color: "grey",
  },
  defaultText: {
    color: "purple",
  },
});

export default styles;
