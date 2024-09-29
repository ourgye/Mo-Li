import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem } from "./RecordItem";
import {
  RecordDataWOArchive,
  type RecordData,
} from "@/constants/types.interface";
import { Text } from "react-native";

import styles from "./style/RecordList";

export function RecordList({
  data,
  ListHeaderComponent,
}: {
  data: RecordDataWOArchive[] | undefined;
  ListHeaderComponent?: React.ReactNode;
}) {
  if (!data) return <Text>데이터가 없습니다.</Text>;

  return (
    <MasonryList
      data={data}
      renderItem={({ item, i }: { item: any; i: number }) => (
        <RecordItem item={item} index={i} />
      )}
      contentContainerStyle={styles.container}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      refreshControl={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}
