import { View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export function FloatingCreateRecordButton() {
  return (
    <Link href="/create-record" asChild style={styles.addFloatingButton}>
      <Pressable>
        <MaterialCommunityIcons name="plus" size={36} color="white" />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  addFloatingButton: {
    width: 58,
    height: 58,
    zIndex: 100,
    backgroundColor: "#5AE3FF",
    position: "absolute",
    right: 24,
    bottom: 24,
    borderRadius: 28,
    borderTopLeftRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
