import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider} from '@realm/react'
import { Record, Archive } from '@/db/entities';

export default function RootLayout() {
  return (
    <RealmProvider schema={[Record, Archive]} closeOnUnmount deleteRealmIfMigrationNeeded>
      <SafeAreaProvider >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </SafeAreaProvider>
    </RealmProvider>
  );
}
