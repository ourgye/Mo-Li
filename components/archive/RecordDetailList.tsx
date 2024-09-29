import React, { useEffect, useRef } from "react";
import {
  FlatList,
} from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  selectCurrentArchive,
  selectSelectedRecordIndex,
} from "@/slices/archiveSlice";
import { getRecordByArchiveId } from "@/db/record-method";

import styles from './style/RecordDetailList'

export function RecordDetailList() {
  const order: boolean = true;
  const currentArchive = useAppSelector(selectCurrentArchive);
  const recordData = getRecordByArchiveId(currentArchive._id, order);
  const selectedRecordIndex = useAppSelector(selectSelectedRecordIndex);
  const recordlistRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (selectedRecordIndex !== -1) {
      recordlistRef.current?.scrollToIndex({
        index: selectedRecordIndex,
        animated: true,
      });
    }
  }, [selectedRecordIndex]);

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
  }) => {
    console.warn("Failed to scroll to index:", info.index);
    console.warn("Highest measured frame index:", info.highestMeasuredFrameIndex);
  };

  return (
    <FlatList
      data={recordData}
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

