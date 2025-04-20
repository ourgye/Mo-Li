import {
  View,
  Text,
  Image,
  Alert,
  LayoutChangeEvent,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import { router } from "expo-router";
import dayjs from "dayjs";

import Record from "@/db/schema/record";
import { useRealm } from "@realm/react";
import { deleteImageAll } from "@/utils/deleteImageAll";
import { deleteRecord } from "@/db/crud/record-method";
import styles from "./style/RecordDetailItem";

export function RecordDetailItem({
  index,
  record,
  onLayout,
}: {
  index: number;
  record: Record;
  onLayout?: (height: number) => void;
}) {
  console.log("rendered index", index, record.body);
  const realm = useRealm();
  const window = useWindowDimensions();
  const contentWidth = window.width - 48 - 32;

  const handleLayout = (e: LayoutChangeEvent) => {
    onLayout?.(e.nativeEvent.layout.height);
  };

  const handleOnPressDelete = async () => {
    await deleteImageAll(record.imagePath);
    deleteRecord(realm, record._id, record.archive[0]._id as Realm.BSON.UUID);
    router.back();
  };

  const handleOptions = ({ nativeEvent }: NativeActionEvent) => {
    if (nativeEvent.event === "modify") {
      router.push(`/modify-record/${record._id.toString()}`);
    } else if (nativeEvent.event === "delete") {
      Alert.alert("레코드 삭제", "레코드를 정말 삭제하시겠습니까?", [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: handleOnPressDelete,
        },
      ]);
    }
  };

  return (
    <View onLayout={handleLayout}>
      <View style={styles.container}>
        <View style={styles.itemHeader}>
          <Text>{dayjs(record.date).format("YYYY-MM-DD")}</Text>
          <MenuView
            title="옵션"
            onPressAction={handleOptions}
            actions={[
              { id: "modify", title: "수정" },
              {
                id: "delete",
                title: "삭제",
                attributes: { destructive: true },
              },
            ]}
          >
            <MaterialCommunityIcons
              name="dots-horizontal-circle"
              size={16}
              color="grey"
            />
          </MenuView>
        </View>
        <Carousel
          width={contentWidth}
          height={contentWidth * (record.imageRatio[0] || 1)}
          data={record.imagePath}
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: contentWidth,
                height: contentWidth * (record.imageRatio[index] || 1),
              }}
            />
          )}
        />
        <Text style={styles.bodyText}>{record.body}</Text>
      </View>
      <View style={{ height: 16 }} />
    </View>
  );
}
