import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: colors.modal0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.white0,
    width: "80%",
    padding: 24,
    gap: 24,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.black0,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 32,
    borderColor: colors.black0,
  },
  buttonOpen: {
    backgroundColor: colors.blue0,
  },
  buttonClose: {
    backgroundColor: colors.gray2,
  },
});

export default styles;
