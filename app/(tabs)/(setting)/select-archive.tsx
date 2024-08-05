import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithTitle } from "@/components/HeaderWithTitle";
import { CommonList as ArchiveList } from "@/components/CommonList";
import { type CommonListItemProps } from "@/components/CommonListItem";

// hardcoded data
//     leftIcon: "none" | "chevron-right" | "menu";
// selected?: boolean;
// title: string;
const data: CommonListItemProps[] = [
  {
    leftIcon: "menu",
    title: "2021년 1월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 2월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 3월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 4월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 5월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 6월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 7월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 8월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2021년 9월",
    rightIcon: "dots-horizontal-circle",
  },
  // repeat
  {
    leftIcon: "menu",
    title: "2022년 1월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 2월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 3월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 4월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 5월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 6월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 7월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 8월",
    rightIcon: "dots-horizontal-circle",
  },
  {
    leftIcon: "menu",
    title: "2022년 9월",
    rightIcon: "dots-horizontal-circle",
  },
];

export default function SelectArchive() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderWithTitle title="아카이브" />
        <ArchiveList data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    gap: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
