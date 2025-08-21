import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { OrderCustomDropDown } from "./OrderDropDown";
import Record from "@/db/schema/record";
import { useEffect, useState, useMemo, useCallback } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { useRealm } from "@realm/react";
import { useRecordArchiveFiltered } from "@/hooks/useRecordArchiveFilterd";
import typos from "@/assets/fonts/typos";
import RecordAdBlock from "../ad/record-ad-block";

// Virtual ad insertion utility - calculates positions without modifying data
const getVirtualItemInfo = (virtualIndex: number, recordsLength: number) => {
  const AD_INTERVAL = 12;

  // Calculate how many complete groups of (12 records + 1 ad) come before this index
  const completeGroups = Math.floor(virtualIndex / (AD_INTERVAL + 1));

  // Position within current group
  const positionInGroup = virtualIndex % (AD_INTERVAL + 1);

  // If position is at the ad slot (position 12 in group)
  const isAd = positionInGroup === AD_INTERVAL;

  if (isAd) {
    return { isAd: true, recordIndex: -1 };
  }

  // Calculate actual record index
  const recordIndex = completeGroups * AD_INTERVAL + positionInGroup;

  return {
    isAd: false,
    recordIndex: recordIndex < recordsLength ? recordIndex : -1,
  };
};

export function RecordList({
  archiveId,
}: {
  archiveId: Realm.BSON.UUID | undefined;
}) {
  const realm = useRealm();
  const [currentOrder, setCurrentOrder] = useState<"desc" | "asc">("desc");
  const records = useRecordArchiveFiltered(realm, archiveId, currentOrder);

  // Calculate virtual list size (records + ads)
  const virtualListData = useMemo(() => {
    if (!records) return [];

    const recordsLength = records.length;
    const adsCount = Math.floor(recordsLength / 12);
    const totalVirtualItems = recordsLength + adsCount;

    // Create array of indices for FlashList
    return Array.from({ length: totalVirtualItems }, (_, index) => index);
  }, [records]);

  const renderItem = useCallback(
    ({ item: virtualIndex }: { item: number }) => {
      if (!records) return null;

      const { isAd, recordIndex } = getVirtualItemInfo(
        virtualIndex,
        records.length,
      );

      if (isAd) {
        return <RecordAdBlock />;
      }

      if (recordIndex >= 0 && recordIndex < records.length) {
        return (
          <RecordItem
            item={records[recordIndex]}
            index={recordIndex} // Use original record index for navigation
            order={currentOrder}
          />
        );
      }

      return null;
    },
    [records, currentOrder],
  );

  return (
    records &&
    virtualListData.length > 0 && (
      <>
        <MasonryFlashList
          data={virtualListData}
          estimatedItemSize={128}
          renderItem={renderItem}
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
