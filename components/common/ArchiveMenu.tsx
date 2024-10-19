import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { useState } from "react";
import { View, Platform, Alert } from "react-native";
import ArchiveModal from "./ArchiveModal";

import styles from "./style/ArchiveMenu";

export default function ArchiveMenu({
  _id,
  name,
}: {
  _id: string;
  name: string;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const onPressDelete = () => {
  };

  const onPressAction = ({ nativeEvent }: { nativeEvent: any }) => {
    const event = nativeEvent.event.toString();
    if (event === "modify") {
      setModalVisible(true);
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
      {modalVisible && (
        <ArchiveModal
          archiveId={_id}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modify
        />
      )}
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
