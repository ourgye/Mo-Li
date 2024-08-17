import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  selectRecordList,
  selectSelectedRecordIndex,
} from "@/slices/archiveSlice";
import { index } from "realm";

export function RecordDetailList() {
  const recordData = useAppSelector(selectRecordList);
  const selectedRecordIndex = useAppSelector(selectSelectedRecordIndex);
  const recordlistRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    const time = 10*recordData.length;
    setTimeout(() => {
      if (recordlistRef.current && selectedRecordIndex !== undefined) {
        recordlistRef.current.scrollToIndex({
          index: selectedRecordIndex,
          viewOffset: 0,
          animated: false,
        });
      }
    }, time);
  }, [selectedRecordIndex]);

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
  }) => {
    console.warn("Failed to scroll to index:", info.index);
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

const styles = StyleSheet.create({
  contentContainer: {
    gap: 24,
  },
});
