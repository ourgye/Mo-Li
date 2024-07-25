import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem, type RecordItemData } from "./RecordItem";

export function RecordList({ data }: { data: RecordItemData[] }) {
  return (
    <MasonryList
      data={data}
      renderItem={({ item, i }: { item: any; i: number }) => (
        <RecordItem body={item.body} date={item.date} image={item.image} title={item.title} />
      )}
      contentContainerStyle={{alignItems: "stretch", justifyContent: "space-between"}}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      refreshControl={false}
    />
  );
}
