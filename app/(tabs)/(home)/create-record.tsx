import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { RecordForm } from "@/components/create-record/RecordForm";
import { Header } from "@/components/create-record/Header";
import * as ImagePicker from "expo-image-picker";

export default function CreateRecord() {
  // image 따로 컴포넌트 빼서 추후에 다시 작성
  // any data type으로 설정해놓음
  const [image, setImage] = useState<any>(null);

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
      });
      if (image.canceled) throw new Error("Image picker canceled");
      console.log(image);
      setImage(image);
    } catch (e) {
      console.log(e);
      setImage(null);
    }
  };

  const RecordImage = () => {
    return (
      <Pressable
        style={[styles.recordImage, !image && { height: 234 }]}
        onPress={handleImagePicker}
      >
        {image && (
          <Image
            source={{ uri: image.assets[0].uri }}
            width={234}
            height={(image.assets[0].height / image.assets[0].width) * 234}
            resizeMethod="resize"
          />
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-16}>
        <Header />
        {/* 여기 스타일 너무 하드코딩된 듯... 15 기준으로 작성됨 */}
        <ScrollView
          contentContainerStyle={{ gap: 24, paddingTop: 24, paddingBottom: 72}}
          showsVerticalScrollIndicator={false}
        >
          <RecordImage />
          <RecordForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // body
  container: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    gap: 24,
    flex: 1,
  },
  recordImage: {
    // fixed width
    width: 234,
    // temp height
    // height: 234,
    backgroundColor: "skyblue",
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
  },
});
