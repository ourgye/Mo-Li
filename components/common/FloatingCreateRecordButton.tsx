import { Pressable } from "react-native";
import { Link } from "expo-router";

import SvgIcon from "./SvgIcon";
import colors from "@/assets/colors/colors";

import styles from "./style/FloatingCreateRecordButton";

export function FloatingCreateRecordButton({ from }: { from: string }) {
  return (
    <Link
      href={from + "/create-record"}
      asChild
      style={styles.addFloatingButton}
    >
      <Pressable>
        <SvgIcon name="Floating_add_icon" size={50} fill={colors.white0} />
      </Pressable>
    </Link>
  );
}
