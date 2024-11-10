import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

import styles from "../common/style/CommonList";
import { ArchiveType } from "@/constants/types.interface";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useEffect, useState } from "react";
import ArchiveModal from "../common/ArchiveModal";
import { MenuView, NativeActionEvent } from "@react-native-menu/menu";

export default function ArchiveDraggableList() {
  const { archiveList, setRefreshing, handleChangeArchiveListOrder } =
    useArchiveList();

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
    const handleOnPressOptions = ({ nativeEvent }: NativeActionEvent) => {
      if (nativeEvent.event === "modify") {
        setSelectedArchive(item);
        setModalVisible(true);
      }
      if (nativeEvent.event === "delete") {
        // console.log("delete");
      }
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={drag}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            flexGrow: 1,
          }}
        >
          <Text style={[styles.title]}>{item.name}</Text>
        </View>
        <View style={styles.container}>
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
            <View>
              <Text>...</Text>
            </View>
          </MenuView>
        </View>
      </TouchableOpacity>
    );
  };

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
          <View style={{ height: 0.7, backgroundColor: "#CBCBCB" }} />
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
