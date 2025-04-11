import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModifyRecordHeader from "@/components/modify-record/ModifyRecordHeader";
import { useEffect } from "react";
import { useRealm } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { getRecordById } from "@/db/crud/record-method";
import Realm from "realm";

export default function ModifyRecord() {
  const realm = useRealm();
  const { id } = useLocalSearchParams();
  const record = getRecordById(realm, new Realm.BSON.UUID(id as string));

  console.log("modify", record);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <ModifyRecordHeader />
        <ScrollView
          contentContainerStyle={{ gap: 24, paddingTop: 24, paddingBottom: 72 }}
          showsVerticalScrollIndicator={false}
        ></ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // body
  container: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    gap: 24,
    flex: 1,
  },
});
