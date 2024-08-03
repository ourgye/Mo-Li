// 메인 페이지 아카이브 추가 버튼 컴포넌트
import { Pressable, StyleSheet, Text } from "react-native";

export function AddArchiveButton() {
  return <Pressable style={styles.addArchiveButton} onPress={() => {}} >
    <Text style={styles.buttonFont}>아카이브 추가하기</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
    addArchiveButton: {
        backgroundColor: "#EFEFEF", 
        borderRadius: 24,
        marginTop: 16, // 없으면 위에 리스트랑 간격이 없음
        paddingVertical: 16, 
        paddingHorizontal: 32, 
        alignSelf: "center",
        marginBottom: 16,
    },
    buttonFont: {
        fontSize: 16,
    }
}); 