import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 24,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemTextRight: {
    fontSize: 12,
    color: "#888888",
  },
});

export default styles;
