// 메인 페이지에서 선택한 날짜에 컨텐츠가 없을 때 캘린더 하단에 뜨는 아카이브 리스트 아이템
// 제목, 총 컨텐츠 수, 최근 컨텐츠 날짜를 보여줌

import { Pressable, StyleSheet, Text, View } from "react-native";
// 아이콘은 추후에 따로 분리해서 작성
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export type ItemData = {
  title: string;
  total: number;
  recentDate: string;
};

export type ArchiveListItemProps = {
  item: ItemData;
  onPress: () => void;
};

export function ArchiveListItem({ item, onPress }: ArchiveListItemProps) {
  return (
    <View >
      <Pressable onPress={onPress} style={styles.itemWrapper}>
        <Text>{item.title}</Text>
        <View style={styles.itemRight}>
            <Text>{item.total + '개'} | {item.recentDate}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#888888" />
        </View>
      </Pressable>
    </View>
  );
}

// style, 임시 마음대로 변경 가능
const styles = StyleSheet.create({
    itemWrapper: {
        flex: 1, 
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 24,
    }, 
    itemRight:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, 
    }
}); 