import { useRef, useState } from "react";
import { Image, Pressable, View, Dimensions } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import SvgIcon from "../common/SvgIcon";
import { useRecordForm } from "@/hooks/useRecordForm";
import { useSharedValue } from "react-native-reanimated";
import colors from "@/assets/colors/colors";

interface ImageCarouselProps {
  modify?: boolean;
}

const screenWidth = Dimensions.get("window").width - 48; // 24 padding left and right
const FIXED_HEIGHT = Dimensions.get("window").height / 4; // Fixed height for smooth transitions

export default function ImageCarousel({ modify }: ImageCarouselProps) {
  const {
    // recordImage,
    recordImagePath,
    recordImageRatio,
    // setRecordImage,
    setImageRatio,
    setRecordImagePath,
  } = useRecordForm();

  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  // Removed dynamic height calculations to prevent jumps
  const handleOnDelete = (index: number) => {
    console.log("delete", index);

    if (!setRecordImagePath) return;

    const newImagesPath = recordImagePath?.filter((_, i) => i !== index);
    const newRatio = recordImageRatio.filter((_, i) => i !== index);

    carouselRef.current?.scrollTo({ index: index - 1 }); // 삭제된 이미지의 이전으로 이동

    setRecordImagePath(newImagesPath || []);
    setImageRatio(newRatio);
  };

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  if (recordImagePath?.length === 0) {
    return <ImageCarousel.skeleton />;
  }

  return (
    <View>
      <Carousel
        ref={carouselRef}
        width={screenWidth}
        height={FIXED_HEIGHT}
        data={recordImagePath || []}
        overscrollEnabled={false}
        scrollAnimationDuration={100}
        loop={false}
        pagingEnabled={true}
        onProgressChange={progress}
        renderItem={({ item, index }) => {
          // Calculate actual image dimensions based on aspect ratio
          const imageAspectRatio = recordImageRatio?.[index] ?? 1;
          const containerAspectRatio = FIXED_HEIGHT / screenWidth;

          let actualWidth, actualHeight;

          if (imageAspectRatio > containerAspectRatio) {
            // Image is taller - constrained by height
            actualHeight = FIXED_HEIGHT;
            actualWidth = FIXED_HEIGHT / imageAspectRatio;
          } else {
            // Image is wider - constrained by width
            actualWidth = screenWidth;
            actualHeight = screenWidth * imageAspectRatio;
          }

          return (
            <View
              style={{
                width: screenWidth,
                height: FIXED_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Image wrapper with exact dimensions and border */}
              <View
                style={{
                  width: actualWidth,
                  height: actualHeight,
                  position: "relative",
                  borderWidth: 1,
                  borderColor: colors.black0,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* Delete button inside image bounds */}
                <Pressable
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 2,
                    borderRadius: 15,
                    padding: 5,
                  }}
                  onPress={() => handleOnDelete(index)}
                >
                  <SvgIcon name="Delete_icon" size={20} />
                </Pressable>
                {/* Image without border */}
                <Image
                  key={index}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: item }}
                  resizeMode="cover"
                />
              </View>
            </View>
          );
        }}
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
          width: 8,
          height: 8,
          borderRadius: 99,
          backgroundColor: colors.blued1,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 99,
          overflow: "hidden",
          backgroundColor: colors.gray3,
        }}
        containerStyle={[
          {
            gap: 6,
            margin: 12,
          },
        ]}
        onPress={onPressPagination}
      />
      {/* 화살표 */}
      {/* <View
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
      </View> */}
    </View>
  );
}

ImageCarousel.skeleton = () => {
  return (
    <View
      style={[
        // styles.recordImage,
        { alignSelf: "center", alignItems: "center", justifyContent: "center" },
        // 임시
        {
          borderWidth: 1,
          borderColor: colors.black0,
          borderRadius: 24,
          backgroundColor: colors.white0,
          width: Dimensions.get("window").height / 4,
          height: Dimensions.get("window").height / 4,
        },
      ]}
    >
      <SvgIcon name="Add_icon" size={24} color={colors.gray3} />
    </View>
  );
};
