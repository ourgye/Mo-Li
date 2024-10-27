import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";

import styles from "./style/RecordDetailList";

export function RecordDetailList() {
  const order: boolean = true;
  const recordlistRef = useRef<FlatList<any>>(null);

  useEffect(() => {}, []);

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
  }) => {
    console.warn("Failed to scroll to index:", info.index);
    console.warn(
      "Highest measured frame index:",
      info.highestMeasuredFrameIndex,
    );
  };

  return (
    <FlatList
      data={[]}
      ref={recordlistRef}
      renderItem={({ item, index }) => {
        return <RecordDetailItem item={item} index={index} />;
      }}
      keyExtractor={(item) => item._id.toHexString()}
      onScrollToIndexFailed={onScrollToIndexFailed}
      contentContainerStyle={styles.contentContainer}
    />
  );
}
