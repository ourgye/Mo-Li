import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

// for dummy data
import { insertDummy } from "@/db/insertDummy";
import { getAllArchives } from "@/db/archive-method";

export default function TabLayout() {
  const archives = getAllArchives();
  if(archives.length === 0) {
    insertDummy();
  }
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "Calendar_active_icon" : "Calendar_icon"}
              color={focused ? colors.blued1 : colors.black0}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(archive)"
        options={{
          title: "Archive",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "Feed_active_icon" : "Feed_icon"}
              color={focused ? colors.blued1 : colors.black0}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(setting)"
        options={{
          title: "Setting",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "Account_active_icon" : "Account_icon"}
              color={focused ? colors.blued1 : colors.black0}
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
  },
});
