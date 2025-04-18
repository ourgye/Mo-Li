import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import styles from "../common/style/HeaderWithTitle";
import Archive from "@/db/schema/archive";

export function RecordDetailHeader({ archive }: { archive?: Archive }) {
  return (
    <View style={styles.headerContainer}>
      {/* 사이즈가 플로우랑 다름 (플로우에는 16, 여기서는 32로 설정함) */}
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <MaterialCommunityIcons name="chevron-left" size={32} color="black" />
      </Pressable>
      <Text style={styles.headerTitle}>{archive?.name}</Text>
      {/* ========================= 추가 버튼 ========================= */}
      <Pressable onPress={() => router.navigate("/create-record")}>
        <MaterialCommunityIcons name="plus" size={32} color="black" />
      </Pressable>
    </View>
  );
}
