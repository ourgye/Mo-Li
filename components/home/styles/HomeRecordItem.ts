import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 16,
    gap: 16,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 16,
  },
  itemBodyWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  imageWrapper: {
    borderRadius: 16,
    backgroundColor: "#EFEFEF",
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    paddingVertical: 8,
  },
  //   text styles(remove or modify as needed)
  dateText: {
    fontSize: 12,
    color: "#5B5B5B",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyText: {
    lineHeight: 20,
    fontSize: 14,
  },
});

export default styles;
