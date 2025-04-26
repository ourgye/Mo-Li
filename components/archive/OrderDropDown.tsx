import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import data from "@/constants/Order";

import SvgIcon from "../common/SvgIcon";
import styles from "./style/OrderDropDown";
import typos from "@/assets/fonts/typos";

export interface OrderDropDownProps {
  current: string;
  setOrder: any;
}

export function OrderCustomDropDown({ current, setOrder }: OrderDropDownProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={typos.body1_typo}
        selectedTextStyle={typos.body1_typo}
        // itemTextStyle={typos.body2_typo}
        renderRightIcon={() => <SvgIcon name="Down_small_icon" size={10} />}
        renderItem={({ _id, order, value }) => {
          return (
            <View
              style={[
                styles.itemContainer,
                value === current && styles.selectedItemContainer,
              ]}
            >
              <View style={styles.textContainer}>
                <Text style={typos.body1_typo}>{order}</Text>
              </View>
            </View>
          );
        }}
        data={data}
        maxHeight={300}
        labelField="order"
        valueField="value"
        placeholder={current}
        value={current}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setOrder(item.value);
        }}
      />
    </View>
  );
}
