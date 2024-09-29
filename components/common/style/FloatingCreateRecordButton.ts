import { StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

const styles = StyleSheet.create({
  addFloatingButton: {
    width: 56,
    height: 56,
    zIndex: 100,
    backgroundColor: colors.blue0,
    position: "absolute",
    right: 24,
    bottom: 24,
    borderRadius: 28,
    borderTopLeftRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
