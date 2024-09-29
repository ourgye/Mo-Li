import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
    },
    titleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      fontSize: 16,
      textAlign: "center",
    },
    clicked: {
      color: "#00CFF9",
    },
    iconWrapper: {
      width: 10,
      height: 16,
    },
    totalDateWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    totalDate: {
      fontSize: 12,
      color: "#888888",
    },
});

export default styles
  