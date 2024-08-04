import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/FloatingCreateRecordButton";
import { ArchiveTitle } from "@/components/archive/ArchiveTitle";
import { ArchiveList } from "@/components/archive/ArchiveList";
import { RecordList } from "@/components/archive/RecordList";
import { CustomDropDown, type DropdownItem } from "@/components/CustomDropDown";

// 여기는 홈 컴포넌트의 아카이브 리스트 아이템에 정의된 타입을 가져오고 있음. 추후에 변경 필요.
import { type ItemData } from "@/components/home/ArchiveListItem";
import { type RecordItemData } from "@/components/archive/RecordItem";
import { useState } from "react";

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
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.22",
  },  {
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.23",
  },{
    title: "가포는 최고의 호랑이",
    total: 9,
    recentDate: "2024.07.23",
  },
];

const wholeData: RecordItemData[] = [
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300",
    title: "하이랄 정복기",
    body: "젤다 공주님을 구하러 떠났다. 그런데 아무리 생각해도 민희는 젤다를 너무 못한다. 젤다 뿐만 아니라 그냥 모든 게임을 그리고 엑셀도 못한다. 정말 둘 다 열심히하길 바란다! 이만, 끝.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300",
    title: "귀농 in 스타듀밸리",
    body: "귀농은 끝나지 않는다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/300/200",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/200/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },  {
    date: "2024.07.22",
    image: "https://picsum.photos/400/300",
    title: "가포는 최고의 호랑이",
    body: "가포는 최고의 호랑이인데 왜 이렇게 무시받는 걸까? 갑호는 정말 속상하다. 매일 밤 울고 있다.",
  },
];

const dropDownData: DropdownItem[] = [
  { label: "최신순", value: "0" },
  { label: "과거순", value: "1" },
];

export default function TabTwoScreen() {
  const [current, setCurrent] = useState<ItemData>(archiveList[0]);
  const [showArchives, setShowArchives] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<DropdownItem>(
    dropDownData[0],
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton from="(archive)" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
        <ArchiveTitle
          current={current.title}
          onPress={() => setShowArchives(!showArchives)}
        />
      </View>
      {showArchives &&(
      <View>
          <ArchiveList
            data={archiveList}
            current={current}
            onPress={(item: ItemData) => {
              setCurrent(item);
              setShowArchives(false);
            }}
          />
      </View>)}
      <View style={styles.body}>
        <RecordList
          data={wholeData}
          ListHeaderComponent={
            <View style={styles.bodyHeader}>
              <Text>{current.total}개 레코드</Text>
              <CustomDropDown
                data={dropDownData}
                current={currentOrder}
                setCurrent={setCurrentOrder}
              />
            </View>
          }
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  bodyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  body: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 1,
  },
});