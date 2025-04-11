import { RecordType } from "@/constants/types.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

import styles from "./style/RecordDetailItem";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import { router } from "expo-router";
import Record from "@/db/schema/record";
import dayjs from "dayjs";

export function RecordDetailItem({ record }: { record?: Record }) {
  const dimension = useWindowDimensions();
  const _width = Math.round(dimension.width - 48 - 32);

  const handleOnPressDelete = async (record: Record) => {
    if (!record) return;
    try {
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
          onPress: () => {},
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
        <Image
          borderRadius={16}
          source={{ uri: record.imagePath }}
          width={_width}
          height={_width * record.imageRatio}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{record.body}</Text>
      </View>
    </View>
  );
}
