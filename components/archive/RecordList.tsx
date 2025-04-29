import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { OrderCustomDropDown } from "./OrderDropDown";
import Record from "@/db/schema/record";
import { useEffect, useState } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { useRealm } from "@realm/react";
import { useRecordArchiveFiltered } from "@/hooks/useRecordArchiveFilterd";
import typos from "@/assets/fonts/typos";
import RecordAdBlock from "../ad/record-ad-block";

export function RecordList({
  archiveId,
}: {
  archiveId: Realm.BSON.UUID | undefined;
}) {
  const realm = useRealm();
  const [currentOrder, setCurrentOrder] = useState<"desc" | "asc">("desc");
  const records = useRecordArchiveFiltered(realm, archiveId, currentOrder);
  // const [recordsWithAd, setRecordsWithAd] = useState<Array<Record> | undefined>(
  //   undefined,
  // );

  // // 광고 12개에 하나씩, 또 마지막 레코드는 광고
  // useEffect(() => {
  //   if (records) {
  //     const adIndex = 12;
  //     const recordsWithAd = records.reduce((acc: Array<Record>, record, i) => {
  //       acc.push(record);
  //       if ((i + 1) % adIndex === 0 || i == records.length - 1) {
  //         acc.push({} as Record); // Placeholder for ad
  //       }
  //       return acc;
  //     }, []);

  //     setRecordsWithAd(recordsWithAd);
  //   }
  // }, [records]);

  // console.log("recordsWithAd", recordsWithAd);

  return (
    records && (
      <>
        <MasonryFlashList
          // data={records as Array<Record>}
          data={records}
          estimatedItemSize={128}
          renderItem={({ item, i }: { item: Record; i: number }) => {
            return Object.keys(item).length === 0 ? (
              <RecordAdBlock />
            ) : (
              <RecordItem
                item={item}
                index={i}
                order={currentOrder}
                // setSelectedRecord={setSelectedRecord}
              />
            );
          }}
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
      </>
    )
  );
}
