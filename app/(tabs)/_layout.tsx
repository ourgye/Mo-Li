import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { StyleSheet } from "react-native";

// for dummy data
import { insertDummy } from "@/db/insertDummy";

export default function TabLayout() {
  // insertDummy();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Main",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calendar-text" : "calendar-text-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(archive)"
        options={{
          title: "Archive",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "note-multiple" : "note-multiple-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(setting)"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});