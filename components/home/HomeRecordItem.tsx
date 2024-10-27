// 메인화면 레코드 아이템 컴포넌트
import { useEffect, useState } from "react";
import { Image, Pressable, View, Text } from "react-native";
import * as FileSystem from "expo-file-system";

import styles from "./styles/HomeRecordItem";
import { RecordType } from "@/constants/types.interface";

export function HomeRecordItem({ record }: { record: RecordType }) {
  const [height, setHeight] = useState<number>(0);
  // line height + font size = 32 (추후 제대로 계산해야함)
  // text 자를 때 사용
  const line = 32;
  const fixedWidth = 142; // 고정된 너비
  const imagePath = FileSystem.documentDirectory
    ? FileSystem.documentDirectory + record.imagePath
    : "";

  const DynamicImage = (uri: string) => {
    useEffect(() => {
      // 이미지의 원본 크기를 가져옴
      Image.getSize(uri, (width, height) => {
        // 원본 비율을 계산하여 높이를 설정
        const ratio = height / width;
        const newHeight = fixedWidth * ratio;
        setHeight(newHeight);
      });
    }, [uri]);

    return (
      <View style={styles.imageWrapper}>
        {height > 0 ? (
          <Image
            source={{ uri: uri }}
            style={[styles.image, { width: fixedWidth, height: height }]}
          />
        ) : (
          <Image
            height={300}
            width={fixedWidth}
            source={{ uri: uri }}
            style={[styles.image, { width: fixedWidth, height: fixedWidth }]}
          />
        )}
      </View>
    );
  };

  return (
    <Pressable style={styles.itemWrapper}>
      <Text style={styles.dateText}>{record.date}</Text>
      <View style={styles.itemBodyWrapper}>
        {DynamicImage(imagePath)}
        <View style={styles.itemTextWrapper}>
          <Text style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>
            {record.archiveName}
          </Text>
          <Text
            style={styles.bodyText}
            ellipsizeMode="tail"
            numberOfLines={
              height > 0
                ? Math.ceil(height / line)
                : Math.ceil(fixedWidth / line)
            }
          >
            {record.body}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
