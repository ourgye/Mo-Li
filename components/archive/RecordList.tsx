import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { OrderCustomDropDown } from "./OrderDropDown";
import Record from "@/db/schema/record";
import { useState } from "react";
import { List } from "realm";
import { useRealm } from "@realm/react";
import { useRecordArchiveFiltered } from "@/hooks/useRecordArchiveFilterd";

export function RecordList({
  archiveId,
}: {
  archiveId: Realm.BSON.UUID | undefined;
}) {
  const realm = useRealm();
  const [currentOrder, setCurrentOrder] = useState<"desc" | "asc">("desc");
  const records = useRecordArchiveFiltered(realm, archiveId, currentOrder);

  console.log("currentOrder", currentOrder);

  return (
    records && (
      <MasonryList
        data={records as Array<Record>}
        renderItem={({ item, i }: { item: Record; i: number }) => (
          <RecordItem
            item={item}
            index={i}
            // setSelectedRecord={setSelectedRecord}
          />
        )}
        contentContainerStyle={styles.container}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        refreshControl={false}
        ListHeaderComponent={
          !records || records.length === 0 ? (
            <Text>데이터가 없습니다.</Text>
          ) : (
            <View style={styles.bodyHeader}>
              <Text>{records.length}개 레코드</Text>
              <OrderCustomDropDown
                current={currentOrder}
                setOrder={setCurrentOrder}
              />
            </View>
          )
        }
      />
    )
  );
}
