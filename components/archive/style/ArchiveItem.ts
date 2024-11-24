import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalDateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
  },
  selectedItemContainer: {
    backgroundColor: colors.yellow0,
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default styles;
