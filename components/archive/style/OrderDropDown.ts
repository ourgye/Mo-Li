import colors from "@/assets/colors/colors";
import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get("window").width; //full width

const styles = StyleSheet.create({
  dropdownContainer: {
    //width: 200,
    //backgroundColor: "#FCFCFC",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  dropdown: {
    width: (width - 48) / 2,
    //alignSelf: "flex-start",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFEFEF",
  },

  selectedTextStyle: {
    fontSize: 14,
  },
  iconWrapper: {
    width: 24,
    height: "auto",
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextStyle: {
    fontSize: 14,
  },
  itemContainer: {
    //backgroundColor: colors.gray1,
    height: 32,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  selectedItemContainer: {
    backgroundColor: colors.yellow0,
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 16,
  },
});

export default styles;
