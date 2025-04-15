import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ModifyRecordHeader from "@/components/create-update-record/ModifyRecordHeader";
import { useEffect } from "react";
import { useRealm } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { getRecordById } from "@/db/crud/record-method";
import Realm from "realm";
import { useRecordForm } from "@/hooks/useRecordForm";
import { RecordForm } from "@/components/create-update-record/RecordForm";

export default function ModifyRecord() {
  const realm = useRealm();
  const { id } = useLocalSearchParams();
  const modifyingRecord = getRecordById(
    realm,
    new Realm.BSON.UUID(id as string),
  );
  const { setModifyState } = useRecordForm();

  useEffect(() => {
    if (modifyingRecord) {
      setModifyState(modifyingRecord);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <RecordForm
          modify={true}
          recordId={new Realm.BSON.UUID(id as string)}
        />
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
