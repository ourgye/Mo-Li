import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useRecordForm } from "@/hooks/useRecordForm";
import styles from "./style/RecordForm";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import dayjs from "dayjs";
import RecordFormImage from "./RecordFormImage";
import CreateRecordHeader from "./CreateRecordHeader";
import Record from "@/db/schema/record";
import { saveImage2File } from "@/utils/saveImage2File";
import { useRealm } from "@realm/react";
import { createNewRecord, updateRecord } from "@/db/crud/record-method";
import {
  updateArchiveCount,
  updateArchiveLastDate,
} from "@/db/crud/archive-method";
import ModifyRecordHeader from "./ModifyRecordHeader";
import { deleteImageAll } from "@/utils/deleteImageAll";

export function RecordForm({
  modify = false,
  recordId,
}: {
  modify?: boolean;
  recordId?: Realm.BSON.UUID;
}) {
  const realm = useRealm();
  const {
    recordWhole,
    recordDate,
    recordBody,
    recordImageRatio,
    recordImagePath,
    recordArchive,
    setRecordDate,
    setRecordBody,
    setInitiailState,
  } = useRecordForm();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const checkRecordForm = () => {
    if (
      !recordWhole.imagePath.length ||
      !recordArchive ||
      !recordBody ||
      !recordDate
    ) {
      return setButtonEnable(false);
    }
    return setButtonEnable(true);
  };

  const createRecord = () => {
    // 사진 있는 지 확인
    if (!recordWhole.imagePath.length) {
      throw new Error("사진을 선택해주세요");
    }
    // 아카이브 있는 지 확인
    if (!recordArchive) {
      throw new Error("아카이브를 선택해주세요");
    }
    // 내용 있는 지 확인
    if (!recordBody) {
      throw new Error("내용을 입력해주세요");
    }
    // 날짜 있는 지 확인
    if (!recordDate) {
      throw new Error("날짜를 선택해주세요");
    }

    const record = Record.generate(
      recordDate,
      [],
      recordImageRatio,
      recordBody,
    );
    const createRec = async () => {
      const imagePath = await saveImage2File(
        recordWhole.imagePath,
        record._id.toString(),
      );

      console.log("[DEBUG] imagePath", imagePath);
      if (imagePath) {
        record.imagePath = imagePath;
      }

      if (recordArchive && imagePath) {
        createNewRecord(realm, record as Record, recordArchive);
        updateArchiveCount(realm, recordArchive._id as Realm.BSON.UUID);
        updateArchiveLastDate(realm, recordArchive._id as Realm.BSON.UUID);
      }
    };
    createRec();
    setInitiailState();
  };

  const modifyRecord = (recordId: Realm.BSON.UUID) => {
    const record = realm.objectForPrimaryKey<Record>(Record, recordId);

    // 사진 있는 지 확인
    if (!recordWhole.imagePath.length) {
      throw new Error("사진을 선택해주세요");
    }
    // 아카이브 있는 지 확인
    if (!recordArchive) {
      throw new Error("아카이브를 선택해주세요");
    }
    // 내용 있는 지 확인
    if (!recordBody) {
      throw new Error("내용을 입력해주세요");
    }
    // 날짜 있는 지 확인
    if (!recordDate) {
      throw new Error("날짜를 선택해주세요");
    }

    let imagePath: string[] = [];
    const updateRec = async () => {
      if (recordImagePath && record) {
        const toBeDeleted = record.imagePath.filter(
          (path) => !recordImagePath.includes(path),
        );
        const deleteSuccess = await deleteImageAll(toBeDeleted);
        if (!deleteSuccess) {
          throw new Error("사진 삭제 실패");
        }
        imagePath = await saveImage2File(
          recordWhole.imagePath,
          recordId.toString(),
        );
      }

      console.log("[DEBUG] imagePath", imagePath);
      if (imagePath.length === 0) {
        imagePath = recordImagePath;
      }

      if (recordArchive && imagePath) {
        updateRecord(
          realm,
          recordId,
          recordDate,
          imagePath,
          recordImageRatio,
          recordBody,
        );
      }
    };
    updateRec();
    setInitiailState();
  };

  useEffect(() => {
    checkRecordForm();
    // console.log("[DEBUG] recordWhole", recordWhole);
  }, [recordWhole]);

  return (
    <View style={{ height: "100%" }}>
      {modify ? (
        <ModifyRecordHeader
          modifyRecord={() => (recordId ? modifyRecord(recordId) : null)}
          buttonEnable={buttonEnable}
        />
      ) : (
        <CreateRecordHeader
          createRecord={createRecord}
          buttonEnable={buttonEnable}
        />
      )}
      <RecordFormImage modify />
      <DateTimePickerModal
        // style={{ flex: 1}}
        isVisible={isDatePickerVisible}
        date={dayjs().toDate()}
        mode="date"
        display="inline"
        onConfirm={(date: Date) => {
          setRecordDate(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        locale="ko_KR"
        accentColor={colors.blue0}
        confirmTextIOS="확인"
        cancelTextIOS="취소"
      />
      {/* 폼 */}
      <View style={[styles.container]}>
        {/*============================== 아카이브  ==============================*/}
        <View style={styles.bottomLine}>
          <Text style={typos.subtitle1_typo}>아카이브</Text>
          <Pressable
            style={styles.inputContainer}
            onPress={() => {
              router.navigate("/select-archive");
            }}
          >
            {/* value from state management */}
            <Text style={typos.body1_typo}>
              {(recordArchive && recordArchive.name) ?? "아카이브 선택"}
            </Text>
            <SvgIcon name="Select_icon" size={20} />
          </Pressable>
        </View>
        {/* ============================== 날짜 ============================== */}
        <View style={styles.bottomLine}>
          <Text style={typos.subtitle1_typo}>날짜</Text>
          <Pressable style={styles.inputContainer} onPress={showDatePicker}>
            <Text style={typos.body1_typo}>
              {dayjs(recordDate).format("YYYY-MM-DD")}
            </Text>
            <SvgIcon name="Select_icon" size={20} />
          </Pressable>
        </View>
        {/* ============================== 내용 ============================== */}
        <View style={[styles.bottomLine, { flex: 1 }]}>
          <Text style={typos.subtitle1_typo}>내용</Text>
          <View style={styles.inputContainer}>
            {/* value from state management */}
            <TextInput
              editable
              multiline
              scrollEnabled
              style={[
                typos.body1_typo,
                styles.textArea,
                { maxHeight: "100%", width: "100%" },
              ]}
              placeholder="내용을 입력해주세요"
              spellCheck={false}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              value={recordBody}
              onChangeText={setRecordBody}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
