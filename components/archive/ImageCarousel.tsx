import Carousel from "react-native-reanimated-carousel";
import { Image, useWindowDimensions } from "react-native";
import { useState } from "react";

interface ImageCarouselProps {
  imagesPath: string[];
  imagesRatio: number[];
  contentWidth: number;
}

export default function ImageCarousel({
  imagesPath,
  imagesRatio,
  contentWidth,
}: ImageCarouselProps) {
  // console.log("ImageCarousel rendered");
  // console.log(imagesPath, imagesRatio, contentWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRatio = imagesRatio?.[currentIndex] ?? 1;
  const carouselHeight = contentWidth * currentRatio;
  // console.log("contentWidth:", contentWidth);
  // console.log("carouselHeight:", carouselHeight); // NaN이면 문제

  return (
    <Carousel
      width={contentWidth}
      height={contentWidth * currentRatio} // 현재 이미지 비율로 높이 결정
      data={imagesPath}
      onSnapToItem={(index) => setCurrentIndex(index)} // 인덱스 변경 감지
      renderItem={({ index, item }) => (
        <Image
          source={{ uri: item }}
          style={{
            width: contentWidth,
            height: contentWidth * (imagesRatio?.[index] ?? 1),
            resizeMode: "contain",
          }}
          //   onLoad={(e) => {
          //     setHeights((prev) => ({
          //       ...prev,
          //       [index]: contentWidth / imagesRatio[index],
          //     }));
          //   }}
        />
      )}
      loop={false}
    />
  );
}
