import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { RecordForm } from "@/components/create_record/RecordForm";
import * as ImagePicker from "expo-image-picker";

export default function CreateRecord() {
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
        <Link asChild href={""}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
        </Link>
        {/* 게시 버튼 */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonTitle}>게시</Text>
        </Pressable>
      </View>
    );
  };

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
    <SafeAreaView style={styles.container} edges={['left','right', 'top']}>
      <Header />
      <ScrollView contentContainerStyle={{gap: 24}} showsVerticalScrollIndicator={false}>
        <RecordImage />
        <RecordForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
