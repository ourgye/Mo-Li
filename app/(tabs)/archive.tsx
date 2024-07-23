import { StyleSheet, View, SafeAreaView, Text} from 'react-native';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Archive Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
  },
});
