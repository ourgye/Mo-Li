// 메인화면 레코드 아이템 컴포넌트
import { useEffect, useState, memo, useMemo } from "react";
import { Image, Pressable, View, Text } from "react-native";

import styles from "./styles/HomeRecordItem";
import typos from "@/assets/fonts/typos";
import Record from "@/db/schema/record";
import dayjs from "dayjs";

// Memoized component for better performance
export const HomeRecordItem = memo(({ record }: { record: Record }) => {
  const [height, setHeight] = useState<number>(0);

  // Memoize expensive calculations
  const formattedDate = useMemo(
    () => dayjs(record.date).format("YYYY-MM-DD"),
    [record.date],
  );

  const archiveName = useMemo(
    () => record.archive[0]?.name || "",
    [record.archive],
  );

  const thumbnailUri = useMemo(
    () => record.imagePath[0] || "",
    [record.imagePath],
  );

  // line height + font size = 32 (추후 제대로 계산해야함)
  // text 자를 때 사용
  const line = 32;
  const fixedWidth = 142; // 고정된 너비

  const numberOfLines = useMemo(
    () =>
      height > 0 ? Math.ceil(height / line) : Math.ceil(fixedWidth / line),
    [height, line, fixedWidth],
  );

  return (
    <Pressable style={styles.itemWrapper}>
      <Text style={typos.caption2_typo}>{formattedDate}</Text>
      <View style={styles.itemBodyWrapper}>
        <DynamicImage
          fixedWidth={fixedWidth}
          uri={thumbnailUri}
          height={height}
          setHeight={setHeight}
        />
        <View style={styles.itemTextWrapper}>
          <Text
            style={typos.subtitle1_typo}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {archiveName}
          </Text>
          <Text
            style={typos.body2_typo}
            ellipsizeMode="tail"
            numberOfLines={numberOfLines}
          >
            {record.body}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

// Memoized DynamicImage component
const DynamicImage = memo(
  ({
    uri,
    height,
    setHeight,
    fixedWidth,
  }: {
    uri: string;
    height: number;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
    fixedWidth: number;
  }) => {
    // useEffect(() => {
    //   // 이미지의 원본 크기를 가져옴
    //   if (uri === "") return;
    //   Image.getSize(uri, (width, height) => {
    //     // 원본 비율을 계산하여 높이를 설정
    //     const ratio = height / width;
    //     const newHeight = fixedWidth * ratio;
    //     setHeight(newHeight);
    //   });
    // }, [uri]);

    //무조건 정방향 유지되도록 변경해서 코드 정리 필요
    return (
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: uri }}
          // source={require("@/assets/images/dummy-images/gapo2.jpeg")}
          height={300}
          width={fixedWidth}
          style={[styles.image, { width: fixedWidth, height: fixedWidth }]}
        />
      </View>
    );
  },
);
