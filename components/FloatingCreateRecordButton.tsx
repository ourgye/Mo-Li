import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

import SvgIcon from "./SvgIcon";
import colors from "@/assets/colors/colors";

export function FloatingCreateRecordButton({from}: {from: string}) {
  return (
    <Link href={from + "/create-record"} asChild style={styles.addFloatingButton}>
      <Pressable>
        <SvgIcon name="Floating_add_icon" size={50} fill={colors.white0} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  addFloatingButton: {
    width: 56,
    height: 56,
    zIndex: 100,
    backgroundColor: colors.blue0,
    position: "absolute",
    right: 24,
    bottom: 24,
    borderRadius: 28,
    borderTopLeftRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
