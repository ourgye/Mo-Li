import { FlatList, StyleSheet, View } from "react-native";
import { HomeRecordItem, type ItemData } from "./HomeRecordItem";

// hard coded data: 3 (from flow) for now
const data: ItemData[] = [
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300",
    title: "하이랄 정복기",
    body: "젤다 공주님을 구하러 떠났다. 그런데 아무리 생각해도 민희는 젤다를 너무 못한다. 젤다 뿐만 아니라 그냥 모든 게임을 그리고 엑셀도 못한다. 정말 둘 다 열심히하길 바란다! 이만, 끝.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300/200",
    title: "귀농 in 스타듀밸리",
    body: "귀농은 끝나지 않는다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
];

export function HomeRecordList() {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <HomeRecordItem {...item}/>}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
