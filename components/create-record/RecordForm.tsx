import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useNewRecord } from "@/hooks/useNewRecord";
import styles from "./style/RecordForm";
import colors from "@/assets/colors/colors";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";
import dayjs from "dayjs";
import RecordFormImage from "./RecordFormImage";
import CreateRecordHeader from "./CreateRecordHeader";
import Record from "@/db/schema/record";
import Archive from "@/db/schema/archive";
import { saveImage2File } from "@/utils/saveImage2File";
import { useRealm } from "@realm/react";
import { createNewRecord } from "@/db/crud/record-method";
import {
  updateArchiveCount,
  updateArchiveLastDate,
} from "@/db/crud/archive-method";

export function RecordForm() {
  const realm = useRealm();
  const {
    newRecord,
    newRecordDate,
    newRecordBody,
    newRecordImageRatio,
    newRecordArchive,
    setRecordDate,
    setRecordBody,
    setInitiailState,
  } = useNewRecord();
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const createRecord = () => {
    // 사진 있는 지 확인
    if (!newRecord.image) {
      throw new Error("사진을 선택해주세요");
    }
    // 아카이브 있는 지 확인
    if (!newRecordArchive) {
      throw new Error("아카이브를 선택해주세요");
    }
    // 내용 있는 지 확인
    if (!newRecordBody) {
      throw new Error("내용을 입력해주세요");
    }
    // 날짜 있는 지 확인
    if (!newRecordDate) {
      throw new Error("날짜를 선택해주세요");
    }

    const record = Record.generate(
      newRecordDate,
      "",
      newRecordImageRatio || 0,
      newRecordBody,
    );
    const createRec = async () => {
      const imagePath = await saveImage2File(
        newRecord.image,
        record._id.toString(),
      );

      if (imagePath) {
        record.imagePath = imagePath;
      }

      if (newRecordArchive && imagePath) {
        createNewRecord(realm, record as Record, newRecordArchive);
        updateArchiveCount(realm, newRecordArchive._id as Realm.BSON.UUID);
        updateArchiveLastDate(realm, newRecordArchive._id as Realm.BSON.UUID);
      }
    };
    createRec();
    setInitiailState();
  };

  return (
    <>
      <CreateRecordHeader createRecord={createRecord} />
      <ScrollView
        contentContainerStyle={{ gap: 24, paddingTop: 24, paddingBottom: 72 }}
        showsVerticalScrollIndicator={false}
      >
        <RecordFormImage />
        <View style={styles.container}>
          <DateTimePickerModal
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
                {(newRecordArchive && newRecordArchive.name) ?? "아카이브 선택"}
              </Text>
              <SvgIcon name="Select_yellow_icon" size={20} />
            </Pressable>
          </View>
          {/* ============================== 날짜 ============================== */}
          <View style={styles.bottomLine}>
            <Text style={typos.subtitle1_typo}>날짜</Text>
            <Pressable style={styles.inputContainer} onPress={showDatePicker}>
              <Text style={typos.body1_typo}>
                {dayjs(newRecordDate).format("YYYY-MM-DD")}
              </Text>
              <SvgIcon name="Select_yellow_icon" size={20} />
            </Pressable>
          </View>
          {/* ============================== 내용 ============================== */}
          <View style={styles.bottomLine}>
            <Text style={typos.subtitle1_typo}>내용</Text>
            <View style={styles.inputContainer}>
              {/* value from state management */}
              <TextInput
                editable
                multiline
                scrollEnabled
                style={[typos.body1_typo, styles.textArea]}
                placeholder="내용을 입력해주세요"
                spellCheck={false}
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                value={newRecordBody}
                onChangeText={setRecordBody}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
