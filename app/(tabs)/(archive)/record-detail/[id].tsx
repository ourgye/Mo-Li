import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordDetailItem } from "@/components/archive/RecordDetailItem";
import { RecordDetailHeader } from "@/components/archive/RecordDetailHeader";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery, useRealm } from "@realm/react";
import { getRecordById } from "@/db/crud/record-method";
import Realm from "realm";
import Record from "@/db/schema/record";

export default function RecordDetail() {
  // get id
  const { id } = useLocalSearchParams();
  // get record from realm
  const realm = useRealm();
  const record = useQuery<Record>("Record").filtered(
    "_id == $0",
    new Realm.BSON.UUID(id as string),
  )[0];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <RecordDetailHeader archive={record?.archive?.[0]} />
      <ScrollView>
        <RecordDetailItem record={record} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
  },
});
