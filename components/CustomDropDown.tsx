import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import colors from "@/assets/colors/colors";
import SvgIcon from "./SvgIcon";

export type DropdownItem = {
  label: string;
  value: string;
};

type CustomDropDownProps = {
  data: DropdownItem[];
  current: DropdownItem;
  setCurrent: (current: DropdownItem) => void;
};

export function CustomDropDown({
  data,
  current,
  setCurrent,
}: CustomDropDownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View>
      <Dropdown
        style={styles.dropdown} // 위에 선택된 드롭다운 스타일
        containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        renderItem={(item: DropdownItem) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.iconWrapper}>
                {item.value == current.value && (
                  <SvgIcon
                    name="Right_small_icon"
                    size={16}
                    fill={colors.blue0}
                  />
                )}
              </View>
              <Text>{item.label}</Text>
            </View>
          );
        }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.selectedTextStyle}
        placeholder={current.label}
        value={current.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DropdownItem) => {
          setCurrent(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

var width = Dimensions.get("window").width; //full width

const styles = StyleSheet.create({
  dropdownContainer: {
    //width: 200,
    //backgroundColor: "#FCFCFC",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  dropdown: {
    width: (width - 48) / 2,
    //alignSelf: "flex-start",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFEFEF",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 32,
    padding: 8,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconWrapper: {
    width: 24,
    height: "auto",
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextStyle: {
    fontSize: 14,
  },
});
