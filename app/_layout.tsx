import "react-native-get-random-values";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/store";
import * as SplashScreen from "expo-splash-screen";
import { RealmProvider, createRealmContext } from "@realm/react";
import mobileAds from "react-native-google-mobile-ads";

import { useEffect } from "react";
import Archive from "@/db/schema/archive";
import Record from "@/db/schema/record";
import naviList from "@/constants/navigation";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    console.log(adapterStatuses);
  });

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

  return (
    <RealmProvider
      schema={[Archive, Record]}
      // deleteRealmIfMigrationNeeded={true}
      path="mo-li-db.realm"
    >
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <Stack>
              {naviList.map((item) => {
                return (
                  <Stack.Screen
                    key={item._id}
                    name={item.name}
                    options={{ headerShown: false }}
                  />
                );
              })}
            </Stack>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </RealmProvider>
  );
}
