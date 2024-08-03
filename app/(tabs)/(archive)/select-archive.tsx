import {View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaerWithTitle } from "@/components/HeaderWithTitle";
import {CommonList as ArchiveList} from "@/components/CommonList";
import {type CommonListItemProps} from "@/components/CommonListItem";

// hardcoded data
//     leftIcon: "none" | "chevron-right" | "menu";
// selected?: boolean;
// title: string;
const data: CommonListItemProps[] = [
    {leftIcon: "chevron-right", title: "2021년 1월"},
    {leftIcon: "chevron-right", title: "2021년 2월"},
    {leftIcon: "chevron-right", title: "2021년 3월"},
    {leftIcon: "chevron-right", title: "2021년 4월"},
    {leftIcon: "chevron-right", title: "2021년 5월"},
    {leftIcon: "chevron-right", title: "2021년 6월"},
    {leftIcon: "chevron-right", title: "2021년 7월"},
    {leftIcon: "chevron-right", title: "2021년 8월"},
    {leftIcon: "chevron-right", title: "2021년 9월"},
    {leftIcon: "chevron-right", title: "2021년 10월"},
    {leftIcon: "chevron-right", title: "2021년 11월"},
    {leftIcon: "chevron-right", title: "2021년 12월"},
    {leftIcon: "chevron-right", title: "2022년 1월"},
    {leftIcon: "chevron-right", title: "2022년 2월"},
    {leftIcon: "chevron-right", title: "2022년 3월"},
    {leftIcon: "chevron-right", title: "2022년 4월"},
    {leftIcon: "chevron-right", title: "2022년 5월"},
    {leftIcon: "chevron-right", title: "2022년 6월"},
    {leftIcon: "chevron-right", title: "2022년 7월"},
    {leftIcon: "chevron-right", title: "2022년 8월"},
    {leftIcon: "chevron-right", title: "2022년 9월"},
    {leftIcon: "chevron-right", title: "2022년 10월"},
    {leftIcon: "chevron-right", title: "2022년 11월"},
    {leftIcon: "chevron-right", title: "2022년 12월"},
    {leftIcon: "chevron-right", title: "2023년 1월"}, 
]

export default function SelectArchive() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <HeaerWithTitle title="아카이브"/>
        <ArchiveList data={data}/>
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