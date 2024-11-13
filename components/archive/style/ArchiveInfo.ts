import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    paddingHorizontal: 24,
    // 임시 상위 패딩 (맘대로 변경 가능)
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default styles;
