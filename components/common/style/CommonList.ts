import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  leftIconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});

export default styles;
