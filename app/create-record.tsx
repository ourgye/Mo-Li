import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordForm } from "@/components/create-update-record/RecordForm";
import { useEffect } from "react";
import { useRecordForm } from "@/hooks/useRecordForm";
import colors from "@/assets/colors/colors";

export default function CreateRecord() {
  const { setInitiailState } = useRecordForm();

  useEffect(() => {
    setInitiailState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <RecordForm modify={false} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // body
  container: {
    flex: 1,
    backgroundColor: colors.gray1,
    paddingHorizontal: 24,
    gap: 24,
    height: "100%",
  },
});
