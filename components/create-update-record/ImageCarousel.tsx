import { useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

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
  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  const onPressNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        index: (currentIndex + 1) % (recordImagePath?.length || 1),
        animated: true,
      });
    }
  };
  const onPressPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        index: (currentIndex - 1) % (recordImagePath?.length || 1),
        animated: true,
      });
    }
  };

  if (recordImagePath?.length === 0) {
    return <ImageCarousel.skeleton />;
  }

  return (
    <View
      style={{
        width: 300,
        borderWidth: 1,
        borderColor: "red",
        alignSelf: "center",
      }}
    >
      <Carousel
        ref={carouselRef}
        width={300} // 임시 너비
        height={currentHeight}
        data={recordImagePath || []}
        overscrollEnabled={false}
        // 애니메이션 추가해서 부드럽게 전환해야함
        scrollAnimationDuration={100}
        loop={false}
        pagingEnabled={true}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <View style={{ width: width, alignSelf: "center" }}>
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
        // 옆에 사진 보이게 하는 부분
        // mode="parallax"
        // modeConfig={{
        //   parallaxScrollingScale: 1,
        //   parallaxScrollingOffset: 100,
        //   parallaxAdjacentItemScale: 0.6,
        // }}
      />
      <Pagination.Basic
        progress={progress}
        data={recordImagePath || []}
        activeDotStyle={{
          borderRadius: 100,
          backgroundColor: "#262626",
        }}
        dotStyle={{
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: "#D9D9D9",
        }}
        containerStyle={[
          {
            gap: 5,
            margin: 10,
          },
        ]}
        onPress={onPressPagination}
      />
      {/* 왼쪽 화살표 */}
      <View
        style={{
          position: "absolute",
          top: currentHeight / 2 - 20,
          left: 0,
          zIndex: 1,
        }}
      >
        <Pressable onPress={onPressPrev}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color="red"
            style={{ opacity: currentIndex === 0 ? 0 : 1 }}
          />
        </Pressable>
      </View>
      {/* 오른쪽 화살표 */}
      <View
        style={{
          position: "absolute",
          top: currentHeight / 2 - 20,
          right: 0,
          zIndex: 1,
        }}
      >
        <Pressable onPress={onPressNext}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={40}
            color="red"
            style={{
              opacity: currentIndex === recordImagePath?.length - 1 ? 0 : 1,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

ImageCarousel.skeleton = () => {
  return (
    <View
      style={[
        // styles.recordImage,
        { alignSelf: "center", alignItems: "center" },
        // 임시
        { width: 300, borderWidth: 1, borderColor: "red" },
        {
          height: 240,
          width: 240,
          borderRadius: 24,
        },
      ]}
    ></View>
  );
};
