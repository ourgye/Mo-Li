import { StyleSheet } from "react-native";

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
  iconWrapper: {
    marginLeft: 10, // 아이콘 눌리는거 괜찮은지 확인해봐야됨 손가락 겹치면 패딩값이랑 디자인 조정 필요
  },
});

export default styles;
