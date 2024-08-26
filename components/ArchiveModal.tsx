import { Archive } from "@/db/entities";
import { useObject, useRealm } from "@realm/react";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

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

  if (modify && archiveId) {
    const archive = useObject(Archive, new Realm.BSON.ObjectId(archiveId));
    setArchive(archive);
    if (archive) setArchiveName(archive?.name);
  }

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
            placeholder={"아카이브 이름을 입력하세요"}
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
              onPress={() => {
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
                  });
                });

                setModalVisible(!modalVisible);
                setArchiveName("");
              }}
            >
              <Text style={styles.textStyle}>생성</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
