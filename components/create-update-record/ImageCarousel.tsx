import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface ImageCarouselProps {
  images: ImagePickerAsset[];
  width: number;
  modify?: boolean;
}

export default function ImageCarousel({
  images,
  width,
  modify,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentHeight =
    (width * images[currentIndex].height) / images[currentIndex].width;

  return (
    <Carousel
      width={width}
      height={currentHeight}
      data={images}
      renderItem={({ item, index }) => (
        <Image
          key={index}
          style={[
            // styles.image,
            { resizeMode: "cover" },
            { height: (240 * item.height) / item.width },
          ]}
          source={{ uri: item.uri }}
        />
      )}
      onSnapToItem={(index) => {
        setCurrentIndex(index);
      }}
    />
  );
}
