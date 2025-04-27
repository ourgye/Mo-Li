import { Pressable, Text, View } from "react-native";
import typos from "@/assets/fonts/typos";

import styles from "./styles/HomeArchiveListItem";
import Archive from "@/db/schema/archive";
import dayjs from "dayjs";

export function ArchiveListItem({ archive }: { archive: Archive }) {
  return (
    <View>
      <Pressable style={styles.itemWrapper}>
        <Text style={typos.subtitle1_typo}>{archive.name}</Text>
        <View style={styles.itemRight}>
          <Text style={typos.caption2_typo}>
            {archive.count != 0
              ? archive.count +
                "개 | " +
                dayjs(archive.lastDate).format("YYYY-MM-DD")
              : "컨텐츠가 없습니다"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
