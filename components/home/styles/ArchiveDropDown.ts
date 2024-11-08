import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  dropdownContainer: {
    backgroundColor: colors.gray1,
    padding: 8,
    marginTop: 8,
    borderColor: colors.black0,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  dropdown: {
    backgroundColor: colors.yellow0,
    height: 32,
    //paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderColor: colors.black0,
    borderRadius: 16,
    borderWidth: 1,
  },
  itemContainer: {
    //backgroundColor: colors.gray1,
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  selectedItemContainer: {
    backgroundColor: colors.yellow0,
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
  textContainer: {
    marginHorizontal: 8,
  },
});

export default styles;
