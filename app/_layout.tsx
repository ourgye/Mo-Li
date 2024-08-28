import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider } from "@realm/react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Record, Archive } from "@/db/entities";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout() {
  return (
    <RealmProvider
      schema={[Record, Archive]}
      closeOnUnmount
      deleteRealmIfMigrationNeeded
    >
      <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>

        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      </Provider>
    </RealmProvider>
  );
}
