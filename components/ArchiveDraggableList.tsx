import { ArchiveData } from "@/constants/types.interface";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";
import {
  CommonListItem as ArchiveItem,
  CommonListItemProps,
} from "./CommonListItem";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ArchiveDraggableList({
  data,
}: {
  data: ArchiveData[];
}) {
  const [listData, setListData] = useState(
    data.map((item) => ({
      leftIcon: "menu",
      name: item.name,
      rightIcon: "chevron-right",
      _id: item._id.toHexString(),
    }))
  );

  const renderItem = ({ item, drag }: {item: RenderItem<CommonListItemProps>, drag: any}) => {
    return (
      <TouchableOpacity onLongPress={drag}> 
        <View style={styles.itemContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name={"menu"} size={16} color="#00CFF9" />
            <Text>{item.name}</Text>
          </View>
          <Pressable onPress={() => {}}>
            <MaterialCommunityIcons
              name={"dots-horizontal-circle"}
              size={16}
              color="#00CFF9"
            />
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DraggableFlatList
      containerStyle={{ flex: 1 }}
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onDragEnd={({ data }) => {
        console.log(data);
        setListData(data);
      }}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexGrow: 1,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
});
