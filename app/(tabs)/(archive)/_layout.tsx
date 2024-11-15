import { Stack } from "expo-router";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function ArchiveLayout() {
  return (
    <Stack>
      <Stack.Screen name="archive" options={{ headerShown: false }} />
      <Stack.Screen name="record-detail" options={{ headerShown: false }} />
    </Stack>
  );
}
