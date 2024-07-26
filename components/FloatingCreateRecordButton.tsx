import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export function FloatingCreateRecordButton() {
  return <Link style={styles.addFloatingButton} href='/create-record'>
    <MaterialCommunityIcons name="plus" size={36} color="white" />
  </Link>;
}

const styles = StyleSheet.create({
    addFloatingButton: {
        width: 58, 
        height: 58,
        zIndex: 10, 
        backgroundColor: "#5AE3FF", 
        position: 'absolute',
        right: 24, 
        bottom: 24,
        borderRadius: 28,
        borderTopLeftRadius: 0, 
        justifyContent: 'center',
        alignItems: 'center',
    }
}); 