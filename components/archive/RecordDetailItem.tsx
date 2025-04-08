import { RecordType } from "@/constants/types.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

import styles from "./style/RecordDetailItem";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import { router } from "expo-router";
import { useRecord } from "@/hooks/useRecord";
import { useNewRecord } from "@/hooks/useNewRecord";

export function RecordDetailItem() {
  const { selectedRecord, handleDeleteRecord } = useRecord();
  const { setRecordIsThereNew } = useNewRecord();
  const dimension = useWindowDimensions();
  const _width = Math.round(dimension.width - 48 - 32);

  const handleOnPressDelete = async (record: RecordType | undefined) => {
    if (!record) return;
    try {
      handleDeleteRecord(record);
    } catch (error) {
      console.error("Error deleting record:", error);
      throw error;
    }
    return router.back();
  };

  const handleOnPressOptions = ({ nativeEvent }: NativeActionEvent) => {
    if (nativeEvent.event === "modify") {
      router.push({ pathname: "/modify-record" });
    } else if (nativeEvent.event === "delete") {
      Alert.alert("레코드 삭제", "레코드를 정말 삭제하시겠습니까?", [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => handleOnPressDelete(selectedRecord),
          style: "destructive",
        },
      ]);
    }
  };
  if (!selectedRecord) return null;

  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <Text>{selectedRecord.date.split("T")[0]}</Text>
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
          source={{ uri: selectedRecord.imagePath }}
          width={_width}
          height={_width * selectedRecord.imageRatio}
        />
      </View>
      <View>
        <Text style={styles.bodyText}>{selectedRecord.body}</Text>
      </View>
    </View>
  );
}
