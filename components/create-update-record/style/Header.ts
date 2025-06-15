import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // header
  headerContainer: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  iconWrapper: {
    padding: 8,
  },
  headerTypo: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.blue0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 99,
  },
});

export default styles;
