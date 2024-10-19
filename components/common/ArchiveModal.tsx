import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View, TextInput, Alert } from "react-native";

import styles from "./style/ArchiveModal";

export default function ArchiveModal({
  modalVisible,
  setModalVisible,
  modify = false,
  archiveId = "",
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modify?: boolean;
  archiveId?: string;
}) {
  const [archiveName, setArchiveName] = useState("");

  const handleCreateArchive = () => {};

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
            placeholder={modify ? "아카이브" : "아카이브 이름을 입력하세요"}
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
              <Text style={styles.textStyle}>생성</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
