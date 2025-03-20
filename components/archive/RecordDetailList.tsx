import React, { useEffect, useRef } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";

import styles from "./style/RecordDetailList";
import { useRecord } from "@/hooks/useRecord";
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
  } = useRecord();

  return selectedRecord ? (
    <RecordDetailItem item={selectedRecord} />
  ) : (
    <Text>선택된 레코드가 없습니다.</Text>
  );
}
