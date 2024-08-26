import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithTitle } from "@/components/HeaderWithTitle";
import { CommonList as ArchiveList } from "@/components/CommonList";
import { type CommonListItemProps } from "@/components/CommonListItem";
import { getAllArchives } from "@/db/archive-method";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectRecordArchive,
  setRecordArchive,
} from "@/slices/archiveRecordSlice";
import { router } from "expo-router";

export default function SelectArchive() {
  const archiveData = getAllArchives();
  const dispatch = useAppDispatch();
  const currentArchive = useAppSelector(selectRecordArchive);

  const data: CommonListItemProps[] = archiveData.map((archive) => ({
    leftIcon: "chevron-right",
    name: archive.name,
    _id: archive._id.toHexString(),
    rightIcon: "dots-horizontal-circle",
    setSelected: () => {dispatch(setRecordArchive(archive)); router.back();},
    selected: archive._id.toHexString() === currentArchive?._id.toHexString(),
  }));

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
