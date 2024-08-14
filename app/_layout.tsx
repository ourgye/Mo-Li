import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RealmProvider } from "@realm/react";
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
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </Provider>
    </RealmProvider>
  );
}
