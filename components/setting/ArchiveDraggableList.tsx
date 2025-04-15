import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";

import styles from "../common/style/CommonList";
import { useEffect, useState } from "react";
import ArchiveModal from "../common/ArchiveModal";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import { useArchive } from "@/hooks/useArchive";
import { useRealm } from "@realm/react";
import { deleteArchive, reorderArchives } from "@/db/crud/archive-method";
import Archive from "@/db/schema/archive";

export default function ArchiveDraggableList() {
  const realm = useRealm();
  const archive = useArchive(realm);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedArchive, setSelectedArchive] = useState<Archive>();

  const ArchiveSelectListItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<Archive>) => {
    const handleOnPressOptions = ({ nativeEvent }: NativeActionEvent) => {
      if (nativeEvent.event === "modify") {
        setSelectedArchive(item);
        setModalVisible(true);
      } else if (nativeEvent.event === "delete") {
        Alert.alert(
          "아카이브 삭제",
          '아카이브 "' +
            item.name +
            '"의 모든 레코드도 삭제됩니다.\n 정말 삭제하시겠습니까?',
          [
            {
              text: "취소",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "삭제",
              onPress: () => deleteArchive(realm, item._id as Realm.BSON.UUID),
              style: "destructive",
            },
          ],
        );
      }
    };

    return (
      <Pressable style={styles.itemContainer} onLongPress={drag}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Text style={typos.body1_typo}>{item.name}</Text>
        </View>
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
          <SvgIcon name="More_icon" size={24} />
        </MenuView>
      </Pressable>
    );
  };

  if (!archive || archive.length === 0) {
    return (
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            textAlignVertical: "center",
            lineHeight: 24,
          }}
        >
          아카이브가 없습니다.
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            textAlignVertical: "center",
            lineHeight: 24,
          }}
        >
          상단의 <SvgIcon name="Add_icon" size={24} /> 버튼을 눌러 아카이브를
          추가해주세요.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <ArchiveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        archiveId={
          selectedArchive ? (selectedArchive._id as Realm.BSON.UUID) : undefined
        }
        modify={true}
      />
      <DraggableFlatList
        containerStyle={[styles.container]}
        data={archive as unknown as Archive[]}
        renderItem={ArchiveSelectListItem}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 0.4, backgroundColor: colors.gray3 }} />
        )}
        onDragEnd={({ data }) => {
          reorderArchives(realm, data);
        }}
      />
    </View>
  );
}
