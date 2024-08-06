import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/FloatingCreateRecordButton";
import { ArchiveTitle } from "@/components/archive/ArchiveTitle";
import { ArchiveList } from "@/components/archive/ArchiveList";
import { RecordList } from "@/components/archive/RecordList";
import { CustomDropDown } from "@/components/CustomDropDown";
import { RecordData, ArchiveData } from "@/constants/types.interface";

import { useState } from "react";
import { getArchiveData, getFirstArchive } from "@/db/archive-method";
import { BSON } from "realm";

export default function Archive() {
  const [archiveList, setArchiveList] = useState<ArchiveData[]>(getArchiveData());
  const [current, setCurrent] = useState<ArchiveData>();
  const [recordList, setRecordList] = useState<RecordData[]>();
  const [showArchives, setShowArchives] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<ArchiveData>({
    _id: new BSON.ObjectID(),
    name: "최신순",
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton from="(archive)" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>         <ArchiveTitle
            current={current?.name}
            onPress={() => setShowArchives(!showArchives)}
          />
        </View>
        {showArchives && (
          <View>
            <ArchiveList
              current={current}
              onPress={(item: ArchiveData) => {
                setCurrent(item)
                setShowArchives(false);
              }}
            />
          </View>
        )}
        <View style={styles.body}>
          <RecordList
            data={recordList}
            ListHeaderComponent={
              <View style={styles.bodyHeader}>
                <Text>{recordList?.length}개 레코드</Text>
                <CustomDropDown
                  data={archiveList}
                  current={currentOrder}
                  setCurrent={setCurrentOrder}
                />
              </View>
            }
          />
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
