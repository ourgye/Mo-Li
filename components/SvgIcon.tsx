import React from "react";
import { SvgProps } from "react-native-svg";

import * as Icons from "../assets/images/svg";
import colors from "@/assets/colors/colors";

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  strokeWidth?: number;
};
function SvgIcon({
  name,
  fill,
  width: _width,
  height: _height,
  size,
  strokeWidth = 0, //해결 필요
  ...props
}: IconProps) {
  const Comp = Icons[name];
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <Comp {...props} fill={fill} strokeWidth={strokeWidth} {...sizeProps} />
  );
}

export default SvgIcon;
