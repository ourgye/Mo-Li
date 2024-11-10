import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import ArchiveMenu from "./ArchiveMenu";

import styles from "./style/CommonList";

export interface CommonListItemProps {
  selected?: boolean;
  setSelected?: () => any;
  data: any;
}

export function CommonListItem({
  selected,
  setSelected,
  data,
}: CommonListItemProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={setSelected}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        }}
      >
        <View>
          <Text style={[styles.title, selected && { color: "#00CFF9" }]}>
            {data?.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
