import naviList, { navigationType } from "@/constants/navigation";
import { Stack } from "expo-router";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function ArchiveLayout() {
  const archive: navigationType = naviList
    .find((item) => item.name === "(tabs)")
    ?.children?.find((item) => item.name === "(archive)") as navigationType;
  return (
    <Stack>
      {archive.children?.map((item) => {
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
