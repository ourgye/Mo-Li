import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeList } from "@/components/home/HomeList";
import { FloatingCreateRecordButton } from "@/components/common/FloatingCreateRecordButton";
import { HomeCalendar } from "@/components/home/HomeCalendar";
import { ScrollView } from "react-native-gesture-handler";
import { useCalendar } from "@/hooks/useCalendar";

import createDummyData from "@/db/create-dummy";
import { useRealm } from "@realm/react";
import { createHugeData, deleteAllData } from "@/db/create-huge-data";

// import * as FileSystem from "expo-file-system";

export default function HomeScreen() {
  // create dummy
  const realm = useRealm();

  // 모든 데이터 삭제
  deleteAllData(realm);

  // 아카이브 3 + 레코드 4개
  createDummyData(realm);

  // 레코드 100개, 아카이브 정보 수정안됨(레코드 개수 등)
  createHugeData(realm);

  return (
    <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
      <FloatingCreateRecordButton />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HomeCalendar />
        <HomeList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#F8F8F8",
  },
});
