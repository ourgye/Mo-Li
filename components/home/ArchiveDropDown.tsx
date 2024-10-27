import { ArchiveData } from "@/constants/types.interface";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  selectCurrentArchive,
  setCurrentArchive,
} from "@/slices/calendarSlice";

import styles from "./styles/ArchiveDropDown";
import SvgIcon from "../common/SvgIcon";
import typos from "@/assets/fonts/typos";

export function CustomDropDown() {
  const currentArchive = useAppSelector(selectCurrentArchive);
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const data: any[] = [{ name: "test", _id: "test" }];
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
        data={data}
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholderStyle={typos.caption_typo}
        placeholder={currentArchive != undefined ? "hi" : "undefined"}
        value={data[0]._id}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {}}
      />
    </View>
  );
}
