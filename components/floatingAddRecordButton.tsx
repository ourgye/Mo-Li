import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function FloatingAddRecordButton() {
  return <Pressable style={styles.addFloatingButton} onPress={() => {}}>
    <MaterialCommunityIcons name="plus" size={36} color="white" />
  </Pressable>;
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