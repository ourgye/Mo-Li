import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";

import styles from "../common/style/CommonList";
import { ArchiveType } from "@/constants/types.interface";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useEffect, useState } from "react";
import ArchiveModal from "../common/ArchiveModal";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import { useRecord } from "@/hooks/useRecord";

export default function ArchiveDraggableList() {
  const {
    archiveList,
    setRefreshing,
    handleChangeArchiveListOrder,
    handleDeleteArchive,
  } = useArchiveList();
  const { handelDeleteRecordsByArchive } = useRecord();

  const [settingArchiveList, setSettingArchiveList] =
    useState<ArchiveType[]>(archiveList);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedArchive, setSelectedArchive] = useState<ArchiveType>();

  useEffect(() => {
    setSettingArchiveList(archiveList);
  }, [archiveList]);

  const ArchiveSelectListItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<ArchiveType>) => {
    const deleteArchive = async (archive: ArchiveType) => {
      await handleDeleteArchive(archive);
      await handelDeleteRecordsByArchive(archive._id).then(() =>
        setRefreshing(true),
      );
    };

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
              onPress: () => deleteArchive(item),
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
          title="Options"
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

  if (settingArchiveList.length === 0) {
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
        archive={selectedArchive}
        modify={true}
      />
      <DraggableFlatList
        containerStyle={[styles.container]}
        data={settingArchiveList}
        renderItem={ArchiveSelectListItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 0.4, backgroundColor: colors.gray3 }} />
        )}
        onDragEnd={({ data }) => {
          setSettingArchiveList(data);
          handleChangeArchiveListOrder(data);
          setRefreshing(true);
        }}
      />
    </View>
  );
}
