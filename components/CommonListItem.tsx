import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type CommonListItemProps = {
  leftIcon: "none" | "chevron-right" | "menu";
  rightIcon: "chevron-right" | "dots-horizontal-circle";
  selected?: boolean;
  setSelected?: (title: string | null) => void;
  title: string;
};

export function CommonListItem({
  leftIcon,
  rightIcon,
  selected,
  setSelected,
  title,
}: CommonListItemProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (setSelected) setSelected(title);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexGrow: 1,
        }}
      >
        {leftIcon !== "none" && (
          <View style={styles.leftIconWrapper}>
            {leftIcon == "menu" && (
              <MaterialCommunityIcons name={leftIcon} size={16} color="black" />
            )}
            {leftIcon == "chevron-right" && selected && (
              <MaterialCommunityIcons
                name={leftIcon}
                size={16}
                color="#00CFF9"
              />
            )}
          </View>
        )}
        <View>
          <Text style={[styles.title, selected && { color: "#00CFF9" }]}>
            {title}
          </Text>
        </View>
      </Pressable>
      <MaterialCommunityIcons
        name={rightIcon}
        size={16}
        color="grey"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  leftIconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});
