import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingCreateRecordButton } from "@/components/common/FloatingCreateRecordButton";
import { ArchiveInfo } from "@/components/archive/ArchiveInfo";
import { RecordList } from "@/components/archive/RecordList";
import { useRealm } from "@realm/react";
import { useArchive } from "@/hooks/useArchive";
import { useEffect, useState } from "react";
import Archive from "@/db/schema/archive";
import colors from "@/assets/colors/colors";

export default function ArchivePage() {
  const realm = useRealm();
  const archive = useArchive(realm);
  const [currentArchive, setCurrentArchive] = useState<Archive | undefined>();
  const archiveExists = currentArchive?.isValid?.() ?? false;

  useEffect(() => {
    if (!currentArchive || !currentArchive.isValid()) {
      setCurrentArchive(archive?.[0]);
    }
  }, [archive]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FloatingCreateRecordButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ArchiveInfo
          archive={archive}
          currentArchive={archiveExists ? currentArchive : undefined}
          setCurrentArchive={setCurrentArchive}
        />
        <View style={styles.body}>
          <RecordList
            archiveId={archiveExists ? currentArchive?._id : undefined}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  body: {
    flex: 1,
  },
});
