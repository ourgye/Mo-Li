import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#00CFF9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
});

export default styles;
