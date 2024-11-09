import { Pressable, Text, View } from "react-native";
import typos from "@/assets/fonts/typos";

import styles from "./styles/HomeArchiveListItem";
import { ArchiveType } from "@/constants/types.interface";

export function ArchiveListItem({ archive }: { archive: ArchiveType }) {
  return (
    <View>
      <Pressable
        onPress={() => {
          console.log(`${archive._id}, ${archive.name} clicked`);
        }}
        style={styles.itemWrapper}
      >
        <Text style={[typos.subtitle_typo]}>{archive.name}</Text>
        <View style={styles.itemRight}>
          <Text style={styles.itemTextRight}>
            {archive.count != 0
              ? archive.count + "개 | " + archive.lastDate
              : "컨텐츠가 없습니다"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
