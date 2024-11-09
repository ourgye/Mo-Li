import * as Font from "expo-font";
import { StyleSheet } from "react-native";
import { setCustomText } from "react-native-global-props";
import colors from "../colors/colors";

/*const Layout = () => {
  const [fontsLoaded, setfontsLoaded] = useState(false);
  async function getFont() {
    await Font.loadAsync({
      "Pretendard-Regular": require("../fonts/Pretendard-Regular.otf"),
      "Pretendard-Medium": require("../fonts/Pretendard-Medium.otf"),
      "Pretendard-SemiBold": require("../fonts/Pretendard-SemiBold.otf"),
    });
    setfontsLoaded(true);
  }
};*/

//기본 폰트 설정
const customTextProps = {
  style: {
    fontFamily: "Pretendard-Regular",
    color: colors.black0,
  },
};
setCustomText(customTextProps);

const typos = StyleSheet.create({
  header_typo: {
    fontFamily: "Pretendard-Medium",
    fontSize: 24,
    color: colors.black0,
  },
  subtitle_typo: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: colors.black0,
  },
  body1_typo: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: colors.black0,
  },
  body2_typo: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: colors.black0,
  },
  body3_typo: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: colors.black0,
  },
  caption1_typo: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: colors.black0,
  },
  caption2_typo: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: colors.gray4,
  },
});

export default typos;
