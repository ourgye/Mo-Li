import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // header
  headerContainer: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  iconWrapper: {
    padding: 8,
  },
  button: {
    backgroundColor: colors.blue0,
    width: 60,
    height: 32,
    //paddingHorizontal: 16,
    //paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default styles;
