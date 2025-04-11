import { View, FlatList, Text } from "react-native";
import { HomeRecordItem } from "./HomeRecordItem";
import { ArchiveListItem } from "./HomeArchiveListItem";
import { AddArchiveButton } from "./AddArchiveButton";
import ArchiveModal from "../common/ArchiveModal";
import { useCalendar } from "@/hooks/useCalendar";
import typos from "@/assets/fonts/typos";
import SvgIcon from "../common/SvgIcon";

import {
  getAllRecordsByArchiveAndDate,
  getAllRecordsByDate,
} from "@/db/crud/record-method";
import Record from "@/db/schema/record";
import Archive from "@/db/schema/archive";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Realm from "realm";
import dayjs from "dayjs";
import { useRealm } from "@realm/react";
import { useArchive } from "@/hooks/useArchive";

export function HomeList() {
  const realm = useRealm();
  const { selectedDate, currentArchiveId, currentArchiveName } = useCalendar();
  const archiveList = useArchive(realm);
  const [selectedDateRecords, setSelectedDateRecords] =
    useState<Realm.Results<Record>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getSelectedDateRecords = () => {
    if (currentArchiveId && currentArchiveName) {
      const records = getAllRecordsByArchiveAndDate(
        realm,
        currentArchiveId as Realm.BSON.UUID,
        dayjs(selectedDate, "YYYY-MM-DD").toDate(),
      );
      setSelectedDateRecords(records);
    } else {
      const records = getAllRecordsByDate(
        realm,
        dayjs(selectedDate, "YYYY-MM-DD").toDate(),
      );
      setSelectedDateRecords(records);
    }
  };

  useEffect(() => {
    getSelectedDateRecords();
  }, [currentArchiveId, selectedDate]);

  return (
    <View style={{ flex: 1 }}>
      <ArchiveModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {selectedDateRecords && selectedDateRecords.length > 0 ? (
        <YesRecordList selectedDateRecords={selectedDateRecords} />
      ) : (
        <NoRecordList
          archiveList={archiveList}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

function YesRecordList({
  selectedDateRecords,
}: {
  selectedDateRecords: Realm.Results<Record>;
}) {
  return (
    <FlatList
      scrollEnabled={false}
      data={selectedDateRecords}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <HomeRecordItem record={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function NoRecordList({
  archiveList,
  setModalVisible,
}: {
  archiveList?: Realm.Results<Archive>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <FlatList
      scrollEnabled={false}
      data={archiveList}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      renderItem={({ item }) => <ArchiveListItem archive={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <View
            style={{
              height: 52,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={typos.subtitle1_typo}>나의 아카이브</Text>
            <View>
              <AddArchiveButton setModalVisible={setModalVisible} />
            </View>
          </View>
          {!archiveList && (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  textAlignVertical: "center",
                  lineHeight: 24,
                }}
              >
                아카이브가 없습니다.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  textAlignVertical: "center",
                  lineHeight: 24,
                }}
              >
                상단의 <SvgIcon name="Add_white_icon" size={24} /> 버튼을 눌러
                아카이브를 추가해주세요.
              </Text>
            </View>
          )}
        </View>
      }
    />
  );
}
