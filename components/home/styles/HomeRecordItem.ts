import colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.white0,
    padding: 16,
    gap: 16,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black0,
  },
  itemBodyWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  imageWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black0,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    paddingVertical: 8,
  },
});

export default styles;
