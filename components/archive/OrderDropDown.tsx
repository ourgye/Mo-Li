import { OrderData } from "@/constants/types.interface";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectCurrentOrder, setCurrentOrder } from "@/slices/archiveSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type OrderDropDownProps = {
  data: OrderData[];
};

export function OrderCustomDropDown({data}: OrderDropDownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const current = useAppSelector(selectCurrentOrder); 
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown} // 위에 선택된 드롭다운 스타일
        containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        renderItem={(item: OrderData) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.iconWrapper}>
                {item._id== current._id && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color="#00CFF9"
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
          dispatch(setCurrentOrder(item));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  dropdownContainer: {
    width: 200,
    backgroundColor: "#FCFCFC",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  dropdown: {
    width: 200,
    alignSelf: "flex-start",
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
