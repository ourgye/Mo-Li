import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import ArchiveMenu from "./ArchiveMenu";

import styles from "./style/CommonList";
import typos from "@/assets/fonts/typos";

export interface CommonListItemProps {
  selected?: boolean;
  handleOnPress?: () => any;
  data: any;
}

export function CommonListItem({
  selected,
  handleOnPress,
  data,
}: CommonListItemProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleOnPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        }}
      >
        <View>
          <Text style={[typos.header_typo, selected && { color: "#00CFF9" }]}>
            {data?.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
