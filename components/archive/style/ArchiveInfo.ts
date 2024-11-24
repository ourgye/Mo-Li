import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white0,
    padding: 8,
    borderColor: colors.black0,
    borderRadius: 16,
    borderWidth: 1,
  },
  titleContainer: {
    //backgroundColor: colors.blue0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default styles;
