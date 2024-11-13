import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { StyleSheet, View } from "react-native";
import colors from "../../assets/colors/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          borderColor: colors.black0,
          backgroundColor: colors.gray2,
          borderTopColor: colors.black0,
          height: 52,
          borderWidth: 1,
          borderTopWidth: 1,
          paddingBottom: 0,
          bottom: 28,
          marginHorizontal: 20,
          borderRadius: 100,
        },
        tabBarIconStyle: {
          width: 56,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Main",
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.selectedIconWrapper}>
              <TabBarIcon
                name={focused ? "Calendar_active_icon" : "Calendar_icon"}
                color={focused ? colors.blued1 : colors.black0}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(archive)"
        options={{
          title: "Archive",
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.selectedIconWrapper}>
              <TabBarIcon
                name={focused ? "Feed_active_icon" : "Feed_icon"}
                color={focused ? colors.blued1 : colors.black0}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(setting)"
        options={{
          title: "Setting",
          tabBarIcon: ({ focused }) => (
            <View style={focused && styles.selectedIconWrapper}>
              <TabBarIcon
                name={focused ? "Setting_active_icon" : "Setting_icon"}
                color={focused ? colors.blued1 : colors.black0}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  selectedIconWrapper: {
    width: 56,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black0,
  },
});
