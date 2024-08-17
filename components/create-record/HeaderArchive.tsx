import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import * as FileSystem from "expo-file-system";
import { resetRecord, selectRecord } from "@/slices/archiveRecordSlice";
import { useRealm } from "@realm/react";

export function Header() {
  const onPressBack = () => {
    router.back();
  };
  const recordData = useAppSelector(selectRecord);
  const dispatch = useAppDispatch();
  // invalid hook call 때문에 여기서 바로 저장
  const realm = useRealm();

  const onPressPost = () => {
    // 게시 버튼 눌렀을 때
    console.log(recordData);

    // 모든 값이 있는지 확인
    if (
      !recordData.date ||
      !recordData.body ||
      !recordData.archive ||
      !recordData.image?.assets
    ) {
      alert("모든 값을 입력해주세요");
      return;
    }
    console.log(FileSystem.documentDirectory);

    // 이미지 Path 추출
    const imagePath = recordData.image.assets[0].uri.split("/").pop();
    if (!imagePath) {
      alert("이미지 저장에 실패했습니다");
      return;
    }

    // 이미지 저장
    FileSystem.copyAsync({
      from: recordData.image.assets[0].uri,
      to: FileSystem.documentDirectory + imagePath,
    })
      .then(() => {
        console.log("Image saved");
        // 레코드 저장
        realm.write(() => {
          const id = new Realm.BSON.ObjectID();
          realm.create("Record", {
            _id: id,
            date: recordData.date,
            imagePath: imagePath,
            body: recordData.body,
            archive: recordData.archive,
          }, true);
        });
      })
      .catch((e) => {
        console.log(e);
        alert("저장에 실패했습니다");
        return;
      });

      //redux state 초기화
      dispatch(resetRecord());

      // 레코드 저장 후 아카이브 페이지로 이동
      router.push('/(tabs)/archive'); 
  };

  return (
    <View style={styles.headerContainer}>
      {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
      <Pressable onPress={onPressBack}>
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      {/* 게시 버튼 */}
      <Pressable style={styles.button} onPress={onPressPost}>
        <Text style={styles.buttonTitle}>게시</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
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
