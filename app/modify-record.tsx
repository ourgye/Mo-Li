import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordForm } from "@/components/modify-record/RecordForm";
import RecordFormImage from "@/components/modify-record/RecordFormImage";
import ModifyRecordHeader from "@/components/modify-record/ModifyRecordHeader";
import { useRecord } from "@/hooks/useRecord";
import { useEffect } from "react";

export default function ModifyRecord() {
  const { setModifyRecord, setModifyRecordImageUndefined, selectedRecord } =
    useRecord();

  useEffect(() => {
    setModifyRecordImageUndefined();
    if (selectedRecord) setModifyRecord(selectedRecord);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <ModifyRecordHeader />
        <ScrollView
          contentContainerStyle={{ gap: 24, paddingTop: 24, paddingBottom: 72 }}
          showsVerticalScrollIndicator={false}
        >
          <RecordFormImage />
          <RecordForm />
        </ScrollView>
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
