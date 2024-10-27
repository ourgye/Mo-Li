import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import styles from "./styles/ArchiveDropDown";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";
import { getAllArchives } from "@/db/archive-method";
import { ArchiveType } from "@/constants/types.interface";
import { useCalendar } from "@/hooks/useCalendar";

export function CustomDropDown() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const allTypeArchive: ArchiveType = {
    _id: "0",
    name: "전체",
    lastDate: undefined,
    count: 0,
  };
  const [archiveList, setArchiveList] = useState<ArchiveType[]>([
    allTypeArchive,
  ]);

  const { currentArchive, handleChangeCurrentArchive } = useCalendar();

  useMemo(() => {
    getAllArchives().then((res) => {
      if (res) setArchiveList([allTypeArchive, ...res]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown} // 위에 선택된 드롭다운 스타일
        containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
        selectedTextStyle={typos.body2_typo}
        itemTextStyle={typos.body2_typo}
        renderRightIcon={() => <SvgIcon name="Down_small_icon" size={10} />}
        renderItem={(item) => {
          const isSelected = item._id === currentArchive?._id;
          return (
            <View
              style={[
                isSelected
                  ? styles.itemContainer
                  : styles.selectedItemContainer,
              ]}
            >
              <View style={styles.textContainer}>
                <Text>{item.name}</Text>
              </View>
            </View>
          );
        }}
        data={archiveList}
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholderStyle={styles.selectedTextStyle}
        placeholder={currentArchive ? currentArchive.name : allTypeArchive.name}
        value={currentArchive?._id}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(archive) => {
          handleChangeCurrentArchive(archive);
        }}
      />
    </View>
  );
}
