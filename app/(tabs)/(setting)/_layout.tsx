import { Stack } from "expo-router";
import naviList, { navigationType } from "@/constants/navigation";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function SettingLayout() {
  const setting: navigationType = naviList
    .find((item) => item.name === "(tabs)")
    ?.children?.find((item) => item.name === "(setting)") as navigationType;

  return (
    <Stack>
      {setting.children?.map((item) => {
        return (
          <Stack.Screen
            key={item._id}
            name={item.name}
            options={{ headerShown: false }}
          />
        );
      })}
    </Stack>
  );
}
