// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// 기존에 있었던 코드 재사용 마음대로 변경 가능
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import SvgIcon from "../SvgIcon";

export function TabBarIcon({
  style,
  color,
  ...rest
}: IconProps<ComponentProps<typeof SvgIcon>["name"]>) {
  return (
    <SvgIcon
      size={32}
      fill={color}
      style={[{ marginBottom: 8 }, style]}
      {...rest}
    />
  );
}
