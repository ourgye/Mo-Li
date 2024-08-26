import {View, Text, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Notification() {
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>알림</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 24,
        gap: 24,
        paddingBottom: 24,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});