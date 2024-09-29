import { Archive } from "@/db/entities";
import { useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";

import styles from './style/ArchiveModal'

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
  const realm = useRealm();
  const [archive, setArchive] = useState<Archive | null>();

  useEffect(() => {
    if (modify && archiveId) {
      const archive = realm.objectForPrimaryKey(
        Archive,
        new Realm.BSON.ObjectId(archiveId)
      );
      setArchive(archive);
      setArchiveName(archive ? archive.name : "");
    }
  }, [modify, archiveId]);

  const handleCreateArchive = () => {
    if (modify && archive) {
      realm.write(() => {
        archive.name = archiveName;
      });
      setModalVisible(!modalVisible);
      setArchiveName("");
      return;
    }

    if (!archiveName) {
      Alert.alert("아카이브 이름을 입력해주세요.");
      return;
    }
    const id = new Realm.BSON.ObjectID();
    realm.write(() => {
      realm.create("Archive", {
        _id: id,
        name: archiveName,
        index: realm.objects("Archive").length*100,
      });
    });

    setModalVisible(!modalVisible);
    setArchiveName("");
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
            placeholder={modify ? archive?.name : "아카이브 이름을 입력하세요"}
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

