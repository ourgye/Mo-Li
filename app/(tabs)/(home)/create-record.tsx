import {View,Text,StyleSheet,SafeAreaView} from "react-native";

export default function CreateRecord() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Create Record Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
  },
});