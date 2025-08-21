import { Pressable, Text, View } from "react-native";
import { memo, useMemo } from "react";
import typos from "@/assets/fonts/typos";

import styles from "./styles/HomeArchiveListItem";
import Archive from "@/db/schema/archive";
import dayjs from "dayjs";

export const ArchiveListItem = memo(({ archive }: { archive: Archive }) => {
  const displayText = useMemo(() => {
    return archive.count != 0
      ? archive.count + "개 | " + dayjs(archive.lastDate).format("YYYY-MM-DD")
      : "데이터가 없습니다";
  }, [archive.count, archive.lastDate]);
  return (
    <View>
      <Pressable style={styles.itemWrapper}>
        <Text style={typos.subtitle1_typo}>{archive.name}</Text>
        <View style={styles.itemRight}>
          <Text style={typos.caption2_typo}>
            {displayText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
});
