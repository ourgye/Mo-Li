import { FlatList, View, StyleSheet } from "react-native";
import { ArchiveItem, type ArchiveItemProps } from "./ArchiveItem";
import { type ItemData } from "../home/ArchiveListItem";

type ArchiveListProps = {
    data: ItemData[];
    current: ItemData;
    onPress: (item: ItemData) => void;
};

export function ArchiveList({data, current, onPress}: ArchiveListProps) {
    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={({ item }) => (
                <ArchiveItem
                    current={current.title}
                    data={item}
                    onPress={() => onPress(item)} // 지금은 누르면 이름으로 변경하게 되어 있지만 나중에는 누르면 해당 아카이브로 이동하게 변경
                />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 0.7, backgroundColor: "#CBCBCB", marginHorizontal: 16 }} />}
            scrollEnabled={false}
        />
    )
}    

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: "white", 
        borderRadius: 16,
    }
}); 