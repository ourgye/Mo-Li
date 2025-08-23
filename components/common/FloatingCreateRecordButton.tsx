import { Pressable } from "react-native";
import { Link } from "expo-router";

import SvgIcon from "./SvgIcon";
import colors from "@/assets/colors/colors";

import styles from "./style/FloatingCreateRecordButton";

export function FloatingCreateRecordButton() {
  return (
    <Link href={"/create-record"} asChild style={styles.addFloatingButton}>
      <Pressable>
        <SvgIcon name="Floating_add_icon" size={50} fill={colors.blue0} />
      </Pressable>
    </Link>
  );
}
