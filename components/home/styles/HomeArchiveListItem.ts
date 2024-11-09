import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: colors.white0,
    flex: 1,
    width: "100%",
    height: 52,
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 26,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default styles;
