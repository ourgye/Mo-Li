import React, { useEffect, useRef } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { RecordDetailItem } from "./RecordDetailItem";
import { useAppSelector } from "@/hooks/reduxHooks";

import styles from "./style/RecordDetailList";
import { Text } from "react-native";
import Record from "@/db/schema/record";

export function RecordDetail() {
  return <Text>선택된 레코드가 없습니다.</Text>;
}
