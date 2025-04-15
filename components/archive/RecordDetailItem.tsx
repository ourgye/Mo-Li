import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, useWindowDimensions, Alert } from "react-native";

import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import styles from "./style/RecordDetailItem";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import { router } from "expo-router";
import Record from "@/db/schema/record";
import dayjs from "dayjs";
import { useRealm } from "@realm/react";
import { deleteRecord } from "@/db/crud/record-method";
import { deleteImageAll } from "@/utils/deleteImageAll";

export function RecordDetailItem({ record }: { record: Record }) {
  const realm = useRealm();
  const handleOnPressDelete = async (record: Record) => {
    if (!record) return;
    try {
      // delete image path
      await deleteImageAll(record.imagePath);
      deleteRecord(realm, record._id, record.archive[0]._id as Realm.BSON.UUID);
    } catch (error) {
      console.error("Error deleting record:", error);
      throw error;
    }
    return router.back();
  };

  const handleOnPressOptions = ({ nativeEvent }: NativeActionEvent) => {
    if (nativeEvent.event === "modify") {
      router.push(`/modify-record/${record?._id.toString()}`);
    } else if (nativeEvent.event === "delete") {
      Alert.alert("레코드 삭제", "레코드를 정말 삭제하시겠습니까?", [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            handleOnPressDelete(record);
          },
          style: "destructive",
        },
      ]);
    }
  };

  if (!record) return <>레코드를 불러올 수 없습니다.</>;

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text>{dayjs(record.date).format("YYYY-MM-DD")}</Text>
        <MenuView
          title="옵션"
          onPressAction={handleOnPressOptions}
          actions={[
            {
              id: "modify",
              title: "수정",
            },
            {
              id: "delete",
              title: "삭제",
              attributes: {
                destructive: true,
              },
            },
          ]}
          shouldOpenOnLongPress={false}
        >
          <MaterialCommunityIcons
            name="dots-horizontal-circle"
            size={16}
            color="grey"
          />
        </MenuView>
      </View>
      <View>
        <CarouselImage
          imagePath={record.imagePath}
          imageRatio={record.imageRatio}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{record.body}</Text>
      </View>
    </View>
  );
}

function CarouselImage({
  imagePath,
  imageRatio,
}: {
  imagePath: string[];
  imageRatio: number[];
}) {
  const progress = useSharedValue<number>(0);
  const dimension = useWindowDimensions();
  const _width = Math.round(dimension.width - 48 - 32);

  const dummyImagePath = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/200/300?grayscale",
  ];

  const dummyImageRatio = [0.75, 1.5];

  return (
    <View
      id="carousel-component"
      // style={{
      //   backgroundColor: "grey",
      //   height: (dummyImageRatio[progress.value] as number) * _width,
      // }}
      // dataSet={{ kind: "basic-layouts", name: "parallax" }}
    >
      <Carousel
        autoPlayInterval={2000}
        data={imagePath || dummyImagePath}
        loop={true}
        height={256}
        pagingEnabled={true}
        snapEnabled={true}
        width={_width}
        style={{
          width: _width,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item, index }) => {
          const ratio = imageRatio[index] || dummyImageRatio[index];
          // const ratio = dummyImageRatio[index];
          const height = Math.round(_width * ratio);
          return (
            <Image
              style={{
                width: _width,
                height: height,
              }}
              source={{ uri: item }}
            />
          );
        }}
      />
    </View>
  );
}
