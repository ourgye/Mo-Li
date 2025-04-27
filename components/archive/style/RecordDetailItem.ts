import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white0,
    borderColor: colors.black0,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 16,
    flexDirection: "column",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyText: {
    paddingHorizontal: 8,
    lineHeight: 24,
  },
});

export default styles;
