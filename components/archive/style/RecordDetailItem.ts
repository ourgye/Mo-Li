import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    gap: 16,
    borderRadius: 16,
    flexDirection: "column",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyText: {
    paddingHorizontal: 8,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default styles;
