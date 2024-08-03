import {View,Pressable,Text,StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {router} from "expo-router";

export function Header() {
    return (
      <View style={styles.headerContainer}>
        {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
        <Pressable onPress={()=>{router.back()}}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
        </Pressable>
        {/* 게시 버튼 */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonTitle}>게시</Text>
        </Pressable>
      </View>
    );
  };

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  button: {
    backgroundColor: "#00CFF9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buttonTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
});