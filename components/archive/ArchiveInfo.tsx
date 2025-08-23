import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import { ArchiveItem } from "./ArchiveItem";

import styles from "./style/ArchiveInfo";
import { useEffect, useState } from "react";
import SvgIcon from "../common/SvgIcon";
import { useArchive } from "@/hooks/useArchive";
import { useRealm } from "@realm/react";
import Archive from "@/db/schema/archive";
import Realm from "realm";
import typos from "@/assets/fonts/typos";
import colors from "@/assets/colors/colors";

interface ArchiveInfoProps {
  currentArchive: Archive | undefined;
  setCurrentArchive: (archive: Archive) => void;
  archive: Realm.Results<Archive> | undefined;
}

export function ArchiveInfo({
  currentArchive,
  setCurrentArchive,
  archive,
}: ArchiveInfoProps) {
  const [showArchives, setShowArchives] = useState<boolean>(false);

  const handleOnPressTitle = () => {
    setShowArchives(!showArchives);
  };
  const handleOnPressArchiveItem = (archive: Archive) => {
    setCurrentArchive(archive);
    setShowArchives(false);
  };

  if (!currentArchive)
    return (
      <View style={styles.titleContainer}>
        <Text style={typos.header_typo}>아카이브가 없습니다. </Text>
      </View>
    );

  return (
    <>
      <Pressable style={styles.titleContainer} onPress={handleOnPressTitle}>
        <Text style={typos.header_typo}>{currentArchive?.name}</Text>
        <SvgIcon name="Dropdown_icon" size={20} fill={colors.blue0} />
      </Pressable>
      {showArchives && (
        <FlatList
          style={styles.container}
          data={archive}
          renderItem={({ item, index }) => (
            <ArchiveItem
              key={item._id.toString()}
              isSelected={
                currentArchive?._id.toString() === item._id.toString()
              }
              data={item}
              onPressArchiveItem={() => {
                handleOnPressArchiveItem(item);
              }}
            />
          )}
          scrollEnabled={false}
        />
      )}
    </>
  );
}
