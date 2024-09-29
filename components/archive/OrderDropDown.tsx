import { OrderData } from "@/constants/types.interface";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import colors from "@/assets/colors/colors";
import SvgIcon from "../common/SvgIcon";
import styles from "./style/OrderDropDown";

export interface OrderDropDownProps {
  data: OrderData[];
  current: OrderData;
  setOrder: any;
}

export function OrderCustomDropDown({
  data,
  current,
  setOrder,
}: OrderDropDownProps) {
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
                {item._id == current._id && (
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
          setOrder(item);
        }}
      />
    </View>
  );
}
