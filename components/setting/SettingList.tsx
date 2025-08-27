import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useMemo } from "react";

import styles from "../common/style/CommonList";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";
import naviList, { navigationType } from "@/constants/navigation";

interface SettingSection {
  title: string;
  data: navigationType[];
}

const SettingListItem = ({ data }: { data: navigationType }) => {
  if (data.name === "setting") return null;
  return (
    <Link
      href={data.path || "/"}
      style={[
        styles.itemContainer,
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        },
      ]}
    >
      <Text style={typos.body1_typo}>{data?.nameKo}</Text>
    </Link>
  );
};

export default function SettingList() {
  const setting: navigationType = naviList
    .find((item) => item.name === "(tabs)")
    ?.children?.find((item) => item.name === "(setting)") as navigationType;

  const sections = useMemo((): SettingSection[] => {
    if (!setting?.children) return [];

    const functionalSettings = ["archive-manage", "backup-file", "theme"];

    const informationalSettings = [
      "help",
      "open-source",
      "privacy-policy",
      "contact-us",
      "app-metainfo",
    ];

    const functional = setting.children.filter((item) =>
      functionalSettings.includes(item.name),
    );

    const informational = setting.children.filter((item) =>
      informationalSettings.includes(item.name),
    );

    return [
      {
        title: "사용자 설정",
        data: functional,
      },
      {
        title: "정보",
        data: informational,
      },
    ];
  }, [setting]);

  return (
    <View>
      {sections.map((section) => (
        <View key={section.title} style={{ marginBottom: 32 }}>
          <Text style={[typos.subtitle2_typo, { paddingVertical: 8 }]}>
            {section.title}
          </Text>
          <FlatList
            data={section.data}
            renderItem={({ item }) => <SettingListItem data={item} />}
            keyExtractor={(item) => item._id.toString() + "setting"}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: 0.4, backgroundColor: colors.gray3 }} />
            )}
            contentContainerStyle={styles.container}
            style={{ flex: 1 }}
          />
        </View>
      ))}
    </View>
  );
}
