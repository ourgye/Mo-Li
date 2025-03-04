import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white0,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderColor: colors.black0,
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  leftIconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
