// 메인 페이지에서 선택한 날짜에 컨텐츠가 없을 때 캘린더 하단에 뜨는 아카이브 리스트
// 저장소랑 연결
import { FlatList, View, type FlatListProps } from "react-native";
import {
  ArchiveListItem,
  type ItemData,
  type ArchiveListItemProps,
} from "./ArchiveListItem";
import { AddArchiveButton } from "@/components/home/AddArchiveButton";

// 인자는 수정 필요 혹은 제대로 이해해야 함
export function ArchiveList() {
  // hard coded data: 3 (from flow)
  const archiveList: ItemData[] = [
    {
      title: "하이랄 정복기",
      total: 128,
      recentDate: "2024.07.22",
    },
    {
      title: "귀농 in 스타듀밸리",
      total: 9999,
      recentDate: "2024.07.22",
    },
    {
      title: "가포는 최고의 호랑이",
      total: 9,
      recentDate: "2024.07.22",
    },
  ];

  return (
        <FlatList
        data={archiveList}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
            <ArchiveListItem item={item} onPress={() => {}} />
        )}
        ListFooterComponent={<AddArchiveButton />}
        scrollEnabled={true}
        />
  );
}
