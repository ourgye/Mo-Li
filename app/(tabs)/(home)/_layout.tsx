import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function HomeLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="create-record" options={{ headerShown: false }} />
        <Stack.Screen name="select-archive" options={{ headerShown: false }} />
      </Stack>
  );
}
