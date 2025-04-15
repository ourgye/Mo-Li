import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordForm } from "@/components/create-update-record/RecordForm";
import { useEffect } from "react";
import { useRecordForm } from "@/hooks/useRecordForm";

export default function CreateRecord() {
  const { setInitiailState } = useRecordForm();

  useEffect(() => {
    setInitiailState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <RecordForm modify={false} />
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
