import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import SvgIcon from "../common/SvgIcon";

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
