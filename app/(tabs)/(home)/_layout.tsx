import naviList, { navigationType } from "@/constants/navigation";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function HomeLayout() {
  const home: navigationType = naviList
    .find((item) => item.name === "(tabs)")
    ?.children?.find((item) => item.name === "(home)") as navigationType;

  return (
    <Stack>
      {home.children?.map((item) => {
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
