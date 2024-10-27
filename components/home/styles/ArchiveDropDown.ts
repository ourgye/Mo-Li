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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black0,
    overflow: "hidden",
    //position: "relative",
  },
  dropdown: {
    //alignSelf: "flex-start",
    //width: "100%",
    height: 32,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.yellow0,
    borderWidth: 1,
    borderColor: colors.black0,
  },
  itemContainer: {
    backgroundColor: colors.gray1,
    height: 32,
    padding: 8,
  },
  selectedItemContainer: {
    backgroundColor: colors.yellow0,
    height: 32,
    padding: 8,
    borderWidth: 1,
    borderRadius: 16,
  },
  textContainer: {
    marginHorizontal: 8,
  },
});

export default styles;
