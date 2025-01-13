import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem } from "./RecordItem";

import { Text, View } from "react-native";

import styles from "./style/RecordList";
import { useRecordByArchive } from "@/hooks/useRecordByArchive";
import { OrderCustomDropDown } from "./OrderDropDown";
// import { useEffect } from "react";
// import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
// import { useArchiveList } from "@/hooks/useArchiveList";

export function RecordList() {
  const {
    currentArchive,
    recordList: data,
    currentOrder,
    setCurrentOrder,
    setSelectedRecord,
    // handleChangeArchive,
  } = useRecordByArchive();

  // const { recordIsThereNew } = useHomeNewRecord();

  // useEffect(() => {
  //   console.log(
  //     "recordIsThereNew - archive page; record list",
  //     recordIsThereNew,
  //   );
  //   if (recordIsThereNew && currentArchive) {
  //     handleChangeArchive(currentArchive._id);
  //   }
  // }, [recordIsThereNew]);

  if (!currentArchive || currentArchive.count === 0)
    return <Text>데이터가 없습니다.</Text>;

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
        <View style={styles.bodyHeader}>
          <Text>{currentArchive.count}개 레코드</Text>
          <OrderCustomDropDown
            current={currentOrder}
            setOrder={setCurrentOrder}
          />
        </View>
      }
    />
  );
}
