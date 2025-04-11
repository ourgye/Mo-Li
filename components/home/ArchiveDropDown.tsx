import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./styles/ArchiveDropDown";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import { useCalendar } from "@/hooks/useCalendar";
import { useArchive } from "@/hooks/useArchive";
import { useQuery, useRealm } from "@realm/react";
import Archive from "@/db/schema/archive";

export default function ArchiveDropDown() {
  const { currentArchiveId, currentArchiveName, handleChangeCurrentArchive } =
    useCalendar();
  const realm = useRealm();
  const archives = useArchive(realm);
  const allArchive = Archive.generateDummyAll() as Archive;

  const [currentArchive, setCurrentArchive] = useState<string>(
    currentArchiveName ?? "전체",
  );
  const data = [allArchive, ...(archives || [])];

  return (
    <View style={styles.container}>
      <Dropdown
        key={currentArchiveId?.toString() || "dropdown"}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        selectedTextStyle={typos.body2_typo}
        placeholderStyle={typos.body2_typo}
        itemTextStyle={typos.body2_typo}
        renderRightIcon={() => <SvgIcon name="Down_small_icon" size={10} />}
        data={data}
        renderItem={(item) => {
          const isSelected = currentArchiveId
            ? item._id.toString() === currentArchiveId.toString()
            : item._id.toString() === "VIEW_ALL";

          return (
            <View
              style={[
                isSelected
                  ? styles.selectedItemContainer
                  : styles.itemContainer,
              ]}
            >
              <View style={styles.textContainer}>
                <Text>{item.name}</Text>
              </View>
            </View>
          );
        }}
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholder={currentArchive}
        value={currentArchiveId}
        onChange={(item: Archive) => {
          if (item._id === "VIEW_ALL") {
            handleChangeCurrentArchive(undefined);
            setCurrentArchive("전체");
          } else {
            handleChangeCurrentArchive(item as Archive);
            setCurrentArchive(item.name);
          }
        }}
      />
    </View>
  );
}
