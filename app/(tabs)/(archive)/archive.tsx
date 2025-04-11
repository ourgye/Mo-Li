import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/common/FloatingCreateRecordButton";
import { ArchiveInfo } from "@/components/archive/ArchiveInfo";
import { RecordList } from "@/components/archive/RecordList";
import { useRealm } from "@realm/react";
import { useArchive } from "@/hooks/useArchive";
import { useEffect, useState } from "react";
import Archive from "@/db/schema/archive";

export default function ArchivePage() {
  const realm = useRealm();
  const archive = useArchive(realm);
  const [currentArchive, setCurrentArchive] = useState<Archive | undefined>();

  useEffect(() => {
    setCurrentArchive(currentArchive ?? archive?.[0]);
  }, [archive]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ArchiveInfo
          archive={archive}
          currentArchive={currentArchive}
          setCurrentArchive={setCurrentArchive}
        />
        <View style={styles.body}>
          <RecordList archiveId={currentArchive?._id} />
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
  body: {
    flex: 1,
  },
});
