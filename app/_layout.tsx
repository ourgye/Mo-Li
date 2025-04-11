import "react-native-get-random-values";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/store";
import * as SplashScreen from "expo-splash-screen";
import { RealmProvider } from "@realm/react";
import Realm from "realm";

import { useEffect } from "react";
import Archive from "@/db/schema/archive";
import Record from "@/db/schema/record";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // useEffect(() => {
  //   (async () => {
  //     const realm = await Realm.open({
  //       schema: [Archive, Record],
  //       deleteRealmIfMigrationNeeded: true,
  //     });
  //     console.log("Realm opened and initialized");
  //     realm.close();
  //   })();
  // }, []);

  return (
    <RealmProvider
      schema={[Archive, Record]}
      deleteRealmIfMigrationNeeded={true}
    >
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="create-record"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="select-archive"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="modify-record/[id]"
                options={{ headerShown: false, presentation: "modal" }}
              />
            </Stack>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </RealmProvider>
  );
}
