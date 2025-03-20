import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { useRecord } from "@/hooks/useRecord";
import { OrderCustomDropDown } from "./OrderDropDown";
import { useArchiveList } from "@/hooks/useArchiveList";

export function RecordList() {
  const {
    currentArchive,
    recordList: data,
    currentOrder,
    setCurrentOrder,
    setSelectedRecord,
    handleChangeArchive,
  } = useRecord();
  const { archiveList } = useArchiveList();

  return (
    <MasonryList
      data={data}
      renderItem={({ item, i }: { item: any; i: number }) => (
        <RecordItem
          item={item}
          index={i}
          setSelectedRecord={setSelectedRecord}
        />
      )}
      contentContainerStyle={styles.container}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      refreshControl={false}
      ListHeaderComponent={
        !currentArchive ||
        archiveList.find((item) => item._id === currentArchive?._id)?.count ===
          0 ? (
          <Text>데이터가 없습니다.</Text>
        ) : (
          <View style={styles.bodyHeader}>
            <Text>
              {
                archiveList.find((item) => item._id === currentArchive?._id)
                  ?.count
              }
              개 레코드
            </Text>
            <OrderCustomDropDown
              current={currentOrder}
              setOrder={setCurrentOrder}
            />
          </View>
        )
      }
    />
  );
}
