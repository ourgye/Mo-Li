import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { OrderCustomDropDown } from "./OrderDropDown";
import Record from "@/db/schema/record";
import { useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { useRealm } from "@realm/react";
import { useRecordArchiveFiltered } from "@/hooks/useRecordArchiveFilterd";
import typos from "@/assets/fonts/typos";

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
      <MasonryFlashList
        data={records as Array<Record>}
        estimatedItemSize={128}
        renderItem={({ item, i }: { item: Record; i: number }) => (
          <RecordItem
            item={item}
            index={i}
            order={currentOrder}
            // setSelectedRecord={setSelectedRecord}
          />
        )}
        style={styles.container}
        // contentContainerStyle={styles.container}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          !records || records.length === 0 ? (
            <Text>데이터가 없습니다.</Text>
          ) : (
            <View style={styles.bodyHeader}>
              <Text style={typos.body3_typo}>{records.length}개 레코드</Text>
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
