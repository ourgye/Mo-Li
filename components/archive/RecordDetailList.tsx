import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@realm/react";

import RecordType from "@/db/schema/record";
import { RecordDetailItem } from "./RecordDetailItem";
import Archive from "@/db/schema/archive";

export default function RecordDetailList({
  archive,
}: {
  archive: Archive | null;
}) {
  const { id, initialIndex, order } = useLocalSearchParams<{
    id: string;
    initialIndex?: string;
    order?: "desc" | "asc";
  }>();

  // Apply the order from navigation params (default to desc)
  const sortDescending = order === "asc" ? false : true;

  const data = useQuery<RecordType>("Record")
    .filtered("archive._id == $0", archive?._id)
    .sorted("date", sortDescending);

  const listRef = useRef<FlashList<RecordType>>(null);
  const [ready, setReady] = useState(false);

  // Use passed index if available, otherwise find it
  const targetIndex =
    initialIndex !== undefined
      ? parseInt(initialIndex, 10)
      : data.findIndex((item) => item._id.toString() === id);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (!ready && viewableItems.some((item) => item.index === targetIndex)) {
      setReady(true);
    }
  }).current;

  useEffect(() => {
    if (ready && listRef.current && targetIndex != null) {
      listRef.current.scrollToIndex({
        index: targetIndex,
        animated: false,
        viewPosition: 0,
      });
    }
  }, [ready, targetIndex]);

  return (
    <>
      <FlashList
        ref={listRef}
        data={data}
        initialScrollIndex={targetIndex}
        estimatedItemSize={500}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 10 }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <RecordDetailItem
            index={index}
            record={item}
            // onLayout={(height) => {
            //   if (!heightMap.current[index]) {
            //     heightMap.current[index] = height;
            //   }
            // }}
          />
        )}
      />
    </>
  );
}
