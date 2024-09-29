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
    alignContent: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  dayNamesStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  customHeader: {
    width: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //gap: 24,
  },
  customHeaderWrapper: {
    paddingLeft: 16,
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
