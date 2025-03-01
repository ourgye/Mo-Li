import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordForm } from "@/components/create-record/RecordForm";
import CreateRecordHeader from "@/components/create-record/CreateRecordHeader";
import RecordFormImage from "@/components/create-record/RecordFormImage";

export default function CreateRecord() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <CreateRecordHeader />
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
