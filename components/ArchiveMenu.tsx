import { Archive, Record } from "@/db/entities";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { useObject, useQuery, useRealm } from "@realm/react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";

export default function ArchiveMenu({
  _id,
  name,
}: {
  _id: string;
  name: string;
}) {
  const realm = useRealm();
  const archive = useObject(Archive, new Realm.BSON.ObjectId(_id));
  const records = useQuery(Record, (Records) => {
    return Records.filtered(`archive._id = $0`, archive?._id);
  });

  const onPressDelete = () => {
    // record 삭제
    if (records.length !== 0) {
      realm.write(() => {
        records.forEach((record) => {
          realm.delete(record);
        });
      });
    }

    // archive 삭제
    realm.write(() => {
      realm.delete(archive);
    });
  };

  const onPressAction = ({ nativeEvent }: { nativeEvent: any }) => {
    const event = nativeEvent.event.toString();
    if (event === "modify") {
    } else if (event === "destructive") {
      Alert.alert(
        "아카이브 삭제",
        '아카이브 "' +
          name +
          '"의 모든 레코드도 삭제됩니다.\n 정말 삭제하시겠습니까?',
        [
          {
            text: "취소",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "삭제",
            onPress: onPressDelete,
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <MenuView
        onPressAction={onPressAction}
        actions={[
          {
            id: "modify",
            title: "아카이브 수정",
            titleColor: "#2367A2",
            image: Platform.select({
              ios: "pencil",
            }),
            imageColor: "#2367A2",
          },
          {
            id: "destructive",
            title: "아카이브 삭제",
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: "trash",
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={16}
          color="gray"
        />
      </MenuView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
