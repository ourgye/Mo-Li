import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/FloatingCreateRecordButton";
import { ArchiveTitle } from "@/components/archive/ArchiveTitle";
import { ArchiveList } from "@/components/archive/ArchiveList";
import { RecordList } from "@/components/archive/RecordList";
import { OrderCustomDropDown } from "@/components/archive/OrderDropDown";
import { useEffect, useState } from "react";
import { getArchiveWithRecentDates } from "@/db/archive-method";
import orderList from "@/constants/Order";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectCurrentArchive,
  selectCurrentOrder,
  selectRecordList,
  setCurrentArchive,
  setCurrentOrder,
  setRecordList,
} from "@/slices/archiveSlice";
import { ArchiveDataWithRecentDate } from "@/constants/types.interface";

export default function Archive() {
  const [archiveList, setArchiveList] = useState<ArchiveDataWithRecentDate[]>(
    getArchiveWithRecentDates()
  );
  const dispatch = useAppDispatch();
  const currentArchive = useAppSelector(selectCurrentArchive);
  const currentOrder = useAppSelector(selectCurrentOrder);
  const [showArchives, setShowArchives] = useState(false);
  const recordList = useAppSelector(selectRecordList);

  console.log("archiveList", archiveList);

  if (!currentArchive) {
    dispatch(setCurrentArchive(archiveList[0]));
  }

  useEffect(() => {
    if (currentArchive) {
      dispatch(setRecordList(currentArchive.records));
      dispatch(setCurrentOrder(currentOrder));
    }
  }, [currentArchive]);

  console.log(recordList);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton from="(archive)" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <ArchiveTitle
            current={currentArchive?.name}
            onPress={() => setShowArchives(!showArchives)}
          />
        </View>
        {showArchives && (
          <View>
            <ArchiveList setShowArchives={setShowArchives} data={archiveList} />
          </View>
        )}
        <View style={styles.body}>
          {recordList && (
            <RecordList
              data={recordList}
              ListHeaderComponent={
                <View style={styles.bodyHeader}>
                  <Text>{currentArchive?.recordLength}개 레코드</Text>
                  <OrderCustomDropDown data={orderList} />
                </View>
              }
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  bodyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  body: {
    flex: 1,
  },
});
