import MasonryList from "@react-native-seoul/masonry-list";
import { RecordItem } from "./RecordItem";
import { type RecordData } from "@/constants/types.interface";
import { Text } from "react-native";

export function RecordList({
  data,
  ListHeaderComponent,
}: {
  data: RecordData[] | undefined;
  ListHeaderComponent?: React.ReactNode;
}) {
  if (!data) return <Text>데이터가 없습니다.</Text>;

  return (
    <MasonryList
      data={data}
      renderItem={({ item, i }: { item: any; i: number }) => (
        <RecordItem {...item} />
      )}
      contentContainerStyle={{
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      refreshControl={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}
