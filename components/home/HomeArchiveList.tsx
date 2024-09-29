// 메인 페이지에서 선택한 날짜에 컨텐츠가 없을 때 캘린더 하단에 뜨는 아카이브 리스트
// 저장소랑 연결
import { FlatList, View } from "react-native";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "@/components/home/AddArchiveButton";
import {  ArchiveDataWithRecentDateWORecords, type ArchiveDataAll } from "@/constants/types.interface";
import { HomeCalendar } from "./HomeCalendar";
import { getArchiveWORecord } from "@/db/archive-method";
import { useState } from "react";
import ArchiveModal from "@/components/common/ArchiveModal";

// 인자는 수정 필요 혹은 제대로 이해해야 함
export function ArchiveList() {
  const archiveList: ArchiveDataWithRecentDateWORecords[] = getArchiveWORecord();
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <FlatList
      ListHeaderComponent={<HomeCalendar />}
      data={archiveList}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => (
        <ArchiveListItem item={item} onPress={() => {}} />
      )}
      keyExtractor={(item) => item._id.toHexString()}
      ListFooterComponent={<View>
        <ArchiveModal modalVisible={visibleModal} setModalVisible={setVisibleModal} />
        <AddArchiveButton onPress={()=>{setVisibleModal(true)}}/>
        </View>}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
}
