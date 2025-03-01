import React, { useEffect, useRef } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";

import styles from "./style/RecordDetailList";
import { useRecordByArchive } from "@/hooks/useRecordByArchive";
import { Text } from "react-native";
import { OrderCustomDropDown } from "./OrderDropDown";
import { RecordType } from "@/constants/types.interface";

export function RecordDetailList() {
  const {
    currentArchive,
    recordList: data,
    currentOrder,
    setCurrentOrder,
    selectedRecord,
  } = useRecordByArchive();
  // const recordlistRef = useRef<FlatList<any>>(null);
  // const index = data.findIndex((item) => item._id === selectedRecord?._id);

  // const onScrollToIndexFailed = (info: {
  //   index: number;
  //   highestMeasuredFrameIndex: number;
  // }) => {
  //   console.warn("Failed to scroll to index:", info.index);
  //   console.warn(
  //     "Highest measured frame index:",
  //     info.highestMeasuredFrameIndex,
  //   );
  // };

  return selectedRecord ? (
    <RecordDetailItem item={selectedRecord} />
  ) : (
    <Text>선택된 레코드가 없습니다.</Text>
  );
  // <FlatList
  //   data={data}
  //   ref={recordlistRef}
  //   renderItem={({ item, index }) => {
  //     return <RecordDetailItem item={item} index={index} />;
  //   }}
  //   initialScrollIndex={index}
  //   onScrollToIndexFailed={onScrollToIndexFailed}
  //   showsVerticalScrollIndicator={false}
  //   keyExtractor={(item) => item._id}
  //   contentContainerStyle={styles.contentContainer}
  //   ListHeaderComponent={
  //     <View style={styles.bodyHeader}>
  //       <Text>{currentArchive?.count}개 레코드</Text>
  //       <OrderCustomDropDown
  //         current={currentOrder}
  //         setOrder={setCurrentOrder}
  //       />
  //     </View>
  //   }
  // />
}
