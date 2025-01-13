import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./style/ArchiveModal";
import { useArchiveList } from "@/hooks/useArchiveList";
import { ArchiveType } from "@/constants/types.interface";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";

export default function ArchiveModal({
  modalVisible,
  setModalVisible,
  modify = false,
  archive,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modify?: boolean;
  archive?: ArchiveType;
}) {
  const [archiveName, setArchiveName] = useState(archive?.name || "");
  const { createNewArchive, handleChangeArchiveName } = useArchiveList();

  useEffect(() => {
    if (archive) {
      setArchiveName(archive.name);
    }
  }, [archive]);

  const handleCreateArchive = () => {
    if (archiveName === "") {
      Alert.alert("아카이브 이름을 입력해주세요");
    } else {
      // 아카이브 생성
      if (!modify) {
        try {
          createNewArchive(archiveName);
        } catch (e) {
          console.log(e);
        }
        console.log("아카이브 생성");
      } else {
        if (archiveName === undefined || archive === undefined) return;
        const newArchive: ArchiveType = { ...archive, name: archiveName };
        try {
          // 아카이브 수정
          handleChangeArchiveName(newArchive);
          console.log("아카이브 수정");
        } catch (e) {
          console.log(e);
        }
      }
      setModalVisible(!modalVisible);
      setArchiveName("");
    }
  };

  return (
    <Modal visible={modalVisible} transparent>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={typos.subtitle2_typo}>
            {modify ? "아카이브 수정" : "아카이브 생성"}
          </Text>
          <TextInput
            textContentType="name"
            style={typos.body1_typo}
            placeholder={modify ? "" : "아카이브 이름을 입력하세요"}
            value={archiveName}
            onChangeText={(e) => {
              setArchiveName(e);
            }}
          />
          <View style={styles.buttonView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setArchiveName("");
              }}
            >
              <Text style={typos.body1_typo}>취소</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={handleCreateArchive}
            >
              <Text style={typos.body1_typo}>{modify ? "수정" : "생성"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
