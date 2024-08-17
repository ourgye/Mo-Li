import { FlatList, View, StyleSheet } from "react-native";
import { ArchiveItem } from "./ArchiveItem";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectCurrentArchive } from "@/slices/archiveSlice";

export function ArchiveList({
  data,
  setShowArchives,
}: {
  data: any;
  setShowArchives: any;
}) {
  const curretArchive = useAppSelector(selectCurrentArchive);

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item, index }) => (
        <ArchiveItem
          isSelected={curretArchive?._id.toHexString() === item._id.toHexString()}
          data={item}
          index={index}
          setShowArchives={setShowArchives}
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 0.7,
            backgroundColor: "#CBCBCB",
            marginHorizontal: 16,
          }}
        />
      )}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
  },
});
