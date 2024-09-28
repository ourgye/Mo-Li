import { OrderData } from "@/constants/types.interface";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectCurrentOrder, setCurrentOrder } from "@/slices/archiveSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import colors from "@/assets/colors/colors";
import SvgIcon from "../SvgIcon";

export type OrderDropDownProps = {
  data: OrderData[];
  current: OrderData;
  setOrder: any;
};

export function OrderCustomDropDown({data, current, setOrder}: OrderDropDownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View>
      <Dropdown
        style={styles.dropdown} // 위에 선택된 드롭다운 스타일
        containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        renderItem={(item: OrderData) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.iconWrapper}>
                {item._id== current._id  && (
                  <SvgIcon
                    name="Right_small_icon"
                    size={16}
                    fill={colors.blue0}
                  />
                )}
              </View>
              <Text>{item.order}</Text>
            </View>
          );
        }}
        data={data}
        maxHeight={300}
        labelField="order"
        valueField="_id"
        placeholderStyle={styles.selectedTextStyle}
        placeholder={current.order}
        value={current.order}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: OrderData) => {
          setOrder(item)
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
