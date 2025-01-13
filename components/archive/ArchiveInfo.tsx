import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { ArchiveItem } from "./ArchiveItem";

import styles from "./style/ArchiveInfo";
import { useArchiveList } from "@/hooks/useArchiveList";
import { useRecordByArchive } from "@/hooks/useRecordByArchive";
import { useEffect, useState } from "react";
import SvgIcon from "../common/SvgIcon";
import { useHomeNewRecord } from "@/hooks/useHomeNewRecord";

export function ArchiveInfo() {
  const { archiveList, refreshing, refreshArchiveList } = useArchiveList();
  const { currentArchive, setCurrentArchive, handleChangeArchive } =
    useRecordByArchive();
  const { recordIsThereNew } = useHomeNewRecord();
  const [showArchives, setShowArchives] = useState<boolean>(false);

  const handleOnPressTitle = () => {
    setShowArchives(!showArchives);
  };
  const handleOnPressArchiveItem = (archiveId: string) => {
    handleChangeArchive(archiveId);
    setShowArchives(false);
  };
  // 초기 로딩 시 currentArchive가 없을 경우 첫번째 아카이브를 선택
  if (!currentArchive && archiveList.length > 0) {
    setCurrentArchive(archiveList[0]);
    handleChangeArchive(archiveList[0]._id);
  }

  useEffect(() => {
    console.log("refreshing", refreshing);
    if (refreshing) {
      refreshArchiveList();
    }
  }, [refreshing]);

  useEffect(() => {
    if (recordIsThereNew && currentArchive) {
      if (currentArchive) {
        const refreshedArchive = archiveList.find(
          (archive) => archive._id === currentArchive._id,
        );

        if (refreshedArchive) {
          setCurrentArchive(refreshedArchive);
          console.log("refreshedArchive", refreshedArchive);
          handleChangeArchive(refreshedArchive._id);
        }
      }
    }
  }, [recordIsThereNew, currentArchive]);

  return (
    <>
      <Pressable style={styles.titleContainer} onPress={handleOnPressTitle}>
        <Text style={styles.title}>{currentArchive?.name}</Text>
        <SvgIcon name="Dropdown_icon" size={20} />
      </Pressable>
      {showArchives && (
        <FlatList
          style={styles.container}
          data={archiveList}
          renderItem={({ item, index }) => (
            <ArchiveItem
              key={item._id}
              isSelected={currentArchive?._id === item._id}
              data={item}
              onPressArchiveItem={() => {
                setCurrentArchive(item);
                handleOnPressArchiveItem(item._id);
              }}
            />
          )}
          scrollEnabled={false}
        />
      )}
    </>
  );
}
