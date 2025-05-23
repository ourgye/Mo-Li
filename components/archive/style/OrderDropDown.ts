import colors from "@/assets/colors/colors";
import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get("window").width; //full width

const styles = StyleSheet.create({
  container: {
    width: "40%",
  },
  dropdownContainer: {
    backgroundColor: colors.gray1,
    padding: 8,
    //marginTop: 8,
    borderColor: colors.black0,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  dropdown: {
    backgroundColor: colors.yellow0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    borderColor: colors.black0,
    borderRadius: 20,
    borderWidth: 1,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  selectedItemContainer: {
    backgroundColor: colors.yellow0,
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    borderColor: colors.black0,
    borderWidth: 1,
    borderRadius: 20,
  },
  textContainer: {
    marginHorizontal: 8,
  },
});

export default styles;
