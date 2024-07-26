import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function SettingLayout() {
  return (
      <Stack>
        <Stack.Screen name="setting" options={{headerShown: false}} />
      </Stack>
  );
}
