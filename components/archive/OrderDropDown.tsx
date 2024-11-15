import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import data from "@/constants/Order";

import colors from "@/assets/colors/colors";
import SvgIcon from "../common/SvgIcon";
import styles from "./style/OrderDropDown";

export interface OrderDropDownProps {
  current: string;
  setOrder: any;
}

export function OrderCustomDropDown({ current, setOrder }: OrderDropDownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View>
      <Dropdown
        style={styles.dropdown} // 위에 선택된 드롭다운 스타일
        containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        renderItem={({ _id, order }) => {
          return (
            <View
              style={[
                styles.itemContainer,
                order === current && styles.selectedItemContainer,
              ]}
            >
              <Text>{order}</Text>
            </View>
          );
        }}
        data={data}
        maxHeight={300}
        labelField="order"
        valueField="_id"
        placeholderStyle={styles.selectedTextStyle}
        placeholder={current}
        value={current}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          console.log(item);
          setOrder(item.order);
        }}
      />
    </View>
  );
}
