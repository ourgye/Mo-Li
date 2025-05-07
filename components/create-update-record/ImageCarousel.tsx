import { ImagePickerAsset } from "expo-image-picker";
import { useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./style/RecordForm";
import SvgIcon from "../common/SvgIcon";
import { useRecordForm } from "@/hooks/useRecordForm";
import { useSharedValue } from "react-native-reanimated";

interface ImageCarouselProps {
  // images: ImagePickerAsset[];
  width: number;
  modify?: boolean;
}

export default function ImageCarousel({
  // images,
  width,
  modify,
}: ImageCarouselProps) {
  const {
    // recordImage,
    recordImagePath,
    recordImageRatio,
    // setRecordImage,
    setImageRatio,
    setRecordImagePath,
  } = useRecordForm();

  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue<number>(0);

  const currentHeight = width * (recordImageRatio?.[currentIndex] ?? 1);

  const handleOnDelete = (index: number) => {
    console.log("delete", index);

    if (!setRecordImagePath) return;

    const newImagesPath = recordImagePath?.filter((_, i) => i !== index);
    const newRatio = recordImageRatio.filter((_, i) => i !== index);

    carouselRef.current?.scrollTo({ index: index - 1 }); // 삭제된 이미지의 이전으로 이동

    setRecordImagePath(newImagesPath || []);
    setImageRatio(newRatio);
    setCurrentIndex(index ? index - 1 : 0);
  };

  const snapToItem = (index: number) => {
    console.log("snap to item index", index);
    setCurrentIndex(index);
  };

  return (
    <Carousel
      ref={carouselRef}
      width={width}
      height={currentHeight}
      data={recordImagePath || []}
      overscrollEnabled={false}
      // 애니메이션 추가해서 부드럽게 전환해야함
      scrollAnimationDuration={50}
      loop={false}
      onProgressChange={progress}
      renderItem={({ item, index }) => (
        <View>
          <Pressable
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
            onPress={() => handleOnDelete(index)}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="white"
            />
          </Pressable>
          <Image
            key={index}
            style={[
              styles.recordImage,
              { resizeMode: "cover" },
              { height: 240 * recordImageRatio[index] },
            ]}
            source={{ uri: item }}
          />
        </View>
      )}
      onSnapToItem={snapToItem}
    />
  );
}
