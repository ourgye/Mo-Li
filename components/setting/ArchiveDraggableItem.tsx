import Archive from "@/db/schema/archive";
import { RenderItemParams } from "react-native-draggable-flatlist";

function ArchiveDraggleItem({
  item,
  drag,
  isActive,
}: RenderItemParams<Archive>) {
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
}

export default ArchiveDraggleItem;
