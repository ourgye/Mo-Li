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
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRatio = imagesRatio?.[currentIndex] ?? 1;
  const carouselHeight = contentWidth * currentRatio;

  return (
    <Carousel
      width={contentWidth}
      height={contentWidth * currentRatio} // 현재 이미지 비율로 높이 결정
      data={imagesPath}
      scrollAnimationDuration={50}
      onSnapToItem={(index) => setCurrentIndex(index)}
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
