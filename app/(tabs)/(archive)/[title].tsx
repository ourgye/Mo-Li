import {View, Text, StyleSheet} from "react-native";
import { HeaderWithTitle } from "@/components/HeaderWithTitle";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecordDetailList } from "@/components/archive/RecordDetailList";

export default function ArchiveItem() {
    // 나중에는 상태관리로? 
    const {title} = useLocalSearchParams(); 

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <HeaderWithTitle title={title?.toString()} />
            <RecordDetailList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 24,
    }
});