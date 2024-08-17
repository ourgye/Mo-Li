import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithTitle } from "@/components/HeaderWithTitle";
import { CommonList as ArchiveList } from "@/components/CommonList";
import { type CommonListItemProps } from "@/components/CommonListItem";
import { ArchiveData } from "@/constants/types.interface";
import { getArchiveWORecord } from "@/db/archive-method";

export default function SelectArchive() {
  const archiveData: ArchiveData[] = getArchiveWORecord();
  const data: CommonListItemProps[] = archiveData.map((item) => ({
    leftIcon: "menu",
    name: item.name,
    rightIcon: "chevron-right",
    _id: item._id.toString(),
    setSelected: (): {} => ({  }),
  }));

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderWithTitle title="아카이브" />
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