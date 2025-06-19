import { StyleSheet } from "react-native";
import colors from "@/assets/colors/colors";

const styles = StyleSheet.create({
  addFloatingButton: {
    zIndex: 100,
    width: 56,
    height: 56,
    position: "absolute",
    right: 24,
    bottom: 14,
    borderRadius: 28,
    borderTopLeftRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
