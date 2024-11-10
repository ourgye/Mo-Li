import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordForm } from "@/components/create-record/RecordForm";
import { Header } from "@/components/create-record/Header";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function CreateRecord() {
  const { newRecordImage, setRecordImage } = useHomeNewRecord();
  const [imageFile, setImageFile] =
    useState<ImagePicker.ImagePickerResult | null>(null);

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
      });
      if (image.canceled) throw new Error("Image picker canceled");
      // 이미지 파일로 저장 후, 경로 저장
      setImageFile(image);
    } catch (e) {
      console.log(e);
    }
  };

  const RecordImage = () => {
    return (
      <Pressable
        style={[styles.recordImage, !imageFile && { height: 234 }]}
        onPress={handleImagePicker}
      >
        {imageFile?.assets && (
          <Image
            source={{ uri: imageFile.assets[0].uri }}
            width={234}
            height={
              (imageFile.assets[0].height / imageFile.assets[0].width) * 234
            }
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
          contentContainerStyle={{ gap: 24, paddingTop: 24, paddingBottom: 72 }}
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
