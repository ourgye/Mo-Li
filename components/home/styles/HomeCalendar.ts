import { Dimensions, StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const styles = StyleSheet.create({
  container: {
    //width: "100%",
    //flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "space-between",
  },
  customCalendar: {
    width: width - 48,
    backgroundColor: colors.white0,
    paddingBottom: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black0,
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
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    //gap: 24,
  },
  customHeaderWrapper: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    // marginVertical: 16,
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
