import { useEffect, useState, memo, useCallback } from "react";
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

const ArchiveModal = memo(
  ({
    modalVisible,
    setModalVisible,
    modify = false,
    archive,
  }: {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    modify?: boolean;
    archive?: Archive;
  }) => {
    const realm = useRealm();
    // const archive =
    //   modify && archiveId ? getArchiveById(realm, archiveId) : undefined;
    const [name, setName] = useState<string>("");

    // console.log("archiveId", archiveId);

    const handleCreateArchive = useCallback(() => {
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
    }, [name, modify, realm, archive, modalVisible, setModalVisible]);

    const handleCancel = useCallback(() => {
      setModalVisible(!modalVisible);
    }, [modalVisible, setModalVisible]);

    const handleOverlayPress = useCallback(() => {
      setModalVisible(!modalVisible);
    }, [modalVisible, setModalVisible]);

    const handleTextChange = useCallback((text: string) => {
      setName(text);
    }, []);

    useEffect(() => {
      if (modify && archive) {
        setName(archive.name);
      }
    }, [archive]);

    return (
      <Modal visible={modalVisible} transparent>
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
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
              onChangeText={handleTextChange}
            />
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCancel}
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
  },
);

export default ArchiveModal;
