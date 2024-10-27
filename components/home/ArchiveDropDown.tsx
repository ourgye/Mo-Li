import { useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./styles/ArchiveDropDown";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import { ArchiveType } from "@/constants/types.interface";
import { useCalendar } from "@/hooks/useCalendar";
import { useArchiveList } from "@/hooks/useArchiveList";

export default function ArchiveDropDown() {
  const allTypeArchive: ArchiveType = {
    _id: "0",
    name: "전체",
    lastDate: undefined,
    count: 0,
  };

  const { selectedDate, currentArchive, handleChangeCurrentArchive } =
    useCalendar();
  const { archiveList, refreshArchiveList } = useArchiveList();

  const dropdownData = useMemo(
    () => [allTypeArchive, ...archiveList],
    [archiveList],
  );

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        selectedTextStyle={typos.body2_typo}
        itemTextStyle={typos.body2_typo}
        renderRightIcon={() => <SvgIcon name="Down_small_icon" size={10} />}
        renderItem={(item) => {
          const isSelected = currentArchive
            ? item._id === currentArchive?._id
            : item._id === allTypeArchive._id;
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
        data={dropdownData}
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholder={currentArchive ? currentArchive.name : allTypeArchive.name}
        value={currentArchive ? currentArchive._id : allTypeArchive._id}
        onChange={(archive) => {
          if (archive._id === "0") {
            handleChangeCurrentArchive(undefined, selectedDate);
          } else {
            handleChangeCurrentArchive(archive, selectedDate);
          }
        }}
      />
    </View>
  );
}
