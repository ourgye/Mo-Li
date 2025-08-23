import { useRef, useState } from "react";
import { Image, Pressable, View, Dimensions } from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import styles from "./style/RecordForm";
import SvgIcon from "../common/SvgIcon";
import { useRecordForm } from "@/hooks/useRecordForm";
import { useSharedValue } from "react-native-reanimated";
import colors from "@/assets/colors/colors";

interface ImageCarouselProps {
  // images: ImagePickerAsset[];
  width: number;
  height: number;
  modify?: boolean;
}

const screenWidth = Dimensions.get("window").width - 48; // 24 padding left and right
// const screenHeight = Dimensions.get("window").height / 4;

export default function ImageCarousel({
  // images,
  width,
  height,
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
  const currentWidth = height * (1 / (recordImageRatio?.[currentIndex] ?? 1));

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
  // const onPressNext = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollTo({
  //       index: (currentIndex + 1) % (recordImagePath?.length || 1),
  //       animated: true,
  //     });
  //   }
  // };
  // const onPressPrev = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollTo({
  //       index: (currentIndex - 1) % (recordImagePath?.length || 1),
  //       animated: true,
  //     });
  //   }
  // };

  if (recordImagePath?.length === 0) {
    return <ImageCarousel.skeleton />;
  }

  return (
    <View>
      <Carousel
        ref={carouselRef}
        width={Dimensions.get("window").width - 48}
        height={height || currentHeight}
        data={recordImagePath || []}
        overscrollEnabled={false}
        // 애니메이션 추가해서 부드럽게 전환해야함
        scrollAnimationDuration={100}
        loop={false}
        pagingEnabled={true}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: height,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
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
                <SvgIcon name="Delete_icon" size={20} />
              </Pressable>
              <Image
                key={index}
                style={[
                  styles.recordImage,
                  { resizeMode: "cover" },
                  currentWidth > screenWidth
                    ? {
                        width: screenWidth,
                        height: currentHeight,
                      }
                    : {
                        width: currentWidth,
                      },
                ]}
                source={{ uri: item }}
              />
            </View>
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
      <SvgIcon name="Add_icon" size={24} fill={colors.blue0} />
    </View>
  );
};
