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
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";
import Archive from "@/db/schema/archive";
import Realm from "realm";
import { useRealm } from "@realm/react";
import {
  getArchiveById,
  createNewArchive,
  updateArchive,
} from "@/db/crud/archive-method";

export default function ArchiveModal({
  modalVisible,
  setModalVisible,
  modify = false,
  archiveId,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modify?: boolean;
  archiveId?: Realm.BSON.UUID;
}) {
  const realm = useRealm();
  const archive =
    modify && archiveId ? getArchiveById(realm, archiveId) : undefined;
  const [name, setName] = useState<string>(archive?.name ?? "");

  // console.log("archiveId", archiveId);

  useEffect(() => {
    if (modify && archive) {
      setName(archive.name);
    }
  }, [archiveId]);

  const handleCreateArchive = () => {
    if (name === "") {
      Alert.alert("아카이브 이름을 입력해주세요");
    } else {
      // 아카이브 생성
      if (!modify) {
        createNewArchive(realm, name);
      } else {
        if (name === "" || !archive) return;
        // 아카이브 수정
        updateArchive(realm, archive._id as Realm.BSON.UUID, name);
      }
      setName("");
      setModalVisible(!modalVisible);
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
            placeholder={modify ? name : "아카이브 이름을 입력하세요"}
            value={name}
            onChangeText={(e) => {
              setName(e);
            }}
          />
          <View style={styles.buttonView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
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
