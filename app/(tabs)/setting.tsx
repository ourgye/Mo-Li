import { Text, StyleSheet, View, SafeAreaView } from "react-native";

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Setting Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
  },
});
