import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name="setting" options={{ headerShown: false }} />
      <Stack.Screen name="archive-manage" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="help" options={{ headerShown: false }} />
      <Stack.Screen name="first-launch" options={{ headerShown: false }} />
    </Stack>
  );
}
