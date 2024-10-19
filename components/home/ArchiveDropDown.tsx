import { ArchiveData } from "@/constants/types.interface";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  selectCurrentArchive,
  setCurrentArchive,
} from "@/slices/calendarSlice";

import styles from "./styles/ArchiveDropDown";

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
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        renderItem={(item) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.iconWrapper}>
                {item._id == currentArchive?._id && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color="#00CFF9"
                  />
                )}
                {!currentArchive && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color="#00CFF9"
                  />
                )}
              </View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        data={data}
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholderStyle={styles.selectedTextStyle}
        placeholder={currentArchive != undefined ? "hi" : "undefined"}
        value={data[0]._id}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {}}
      />
    </View>
  );
}
