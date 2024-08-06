// 메인화면 레코드 아이템 컴포넌트
import { RecordData } from "@/constants/types.interface";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";


export function HomeRecordItem(item: RecordData) {
  const [height, setHeight] = useState<number>(0);
  // line height + font size = 32 (추후 제대로 계산해야함)
  // text 자를 때 사용
  const line = 32;
  const fixedWidth = 142; // 고정된 너비

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
            source={{ uri }}
            style={[styles.image, { width: fixedWidth, height: height }]}
          />
        ) : (
          <View style={{ width: fixedWidth, height: fixedWidth }}></View>
        )}
      </View>
    );
  };

  return (
    <Pressable style={styles.itemWrapper}>
      <Text style={styles.dateText}>{item.date.toDateString()}</Text>
      <View style={styles.itemBodyWrapper}>
        {/* 기본 이미지 필요?  */}
        {DynamicImage(item.imagePath)}
        <View style={styles.itemTextWrapper}>
          <Text style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>
            {item.archive.name}
          </Text>
          <Text
            style={styles.bodyText}
            ellipsizeMode="tail"
            numberOfLines={height >0 ? Math.ceil(height / line) : Math.ceil(fixedWidth / line)}
          >
            {item.body}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 16,
    gap: 16,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 16,
  },
  itemBodyWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  imageWrapper: {
    borderRadius: 16,
    backgroundColor: "#EFEFEF",
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    paddingVertical: 8,
  },
  //   text styles(remove or modify as needed)
  dateText: {
    fontSize: 12,
    color: "#5B5B5B",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyText: {
    lineHeight: 20,
    fontSize: 14,
  },
});
