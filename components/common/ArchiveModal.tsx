import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View, TextInput, Alert } from "react-native";

import styles from "./style/ArchiveModal";
import { useArchiveList } from "@/hooks/useArchiveList";
import { ArchiveType } from "@/constants/types.interface";

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
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {modify ? "아카이브 수정" : "아카이브 생성"}
          </Text>
          <TextInput
            textContentType="name"
            style={styles.modalText}
            placeholder={modify ? "" : "아카이브 이름을 입력하세요"}
            value={archiveName}
            onChangeText={(e) => {
              setArchiveName(e);
            }}
          />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setArchiveName("");
              }}
            >
              <Text style={styles.textStyle}>취소</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleCreateArchive}
            >
              <Text style={styles.textStyle}>{modify ? "수정" : "생성"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
