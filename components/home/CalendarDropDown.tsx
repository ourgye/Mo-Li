import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Item ={
    label: string;
    value: string;
}

// hardcoded data for now
const data : Item[] = [
    {label: '전체', value: '0'}, 
    {label: '하이랄 정복기', value: '1'},
    {label: '귀농 in 스타듀밸리', value: '2'},
    {label: '가포는 최고의 호랑이', value: '3'},
]


export function CalendarDropDown(){
    const [value, setValue] = useState<string | null>('0');
    const [isFocus, setIsFocus] = useState<boolean>(false);

    return (
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown} // 위에 선택된 드롭다운 스타일
            containerStyle={styles.dropdownContainer} // 아래에 뜨는 드롭다운 스타일(모든 드롭다운 아이템을 감싸는 컨테이너)
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            renderItem={(item: Item) => {
                return (
                <View style={styles.itemContainer}>
                    <View style={styles.iconWrapper}>
                        {item.value == value && <MaterialCommunityIcons name="chevron-right" size={16} color="#00CFF9" />}
                    </View>
                    <Text>{item.label}</Text>
                </View>); 
            }}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: Item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      );
}

const styles = StyleSheet.create({
container: {
},
dropdownContainer:{
    width: 200,
    backgroundColor: '#FCFCFC',
    borderRadius: 16,
},
dropdown: {
    width: 200,
    alignSelf: "flex-start",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFEFEF", 
},
itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 32,
    padding: 8,
},
selectedTextStyle: {
    fontSize: 14,
},
iconWrapper: {
    width: 24,
    height: 'auto',
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
},
itemTextStyle: {
    fontSize: 14,
}
});