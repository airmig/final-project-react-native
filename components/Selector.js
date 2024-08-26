import {Pressable, Text} from "react-native";
import { useState } from "react";
import { styles } from "./styles";

export default function Selector({item, selectedItems, setSelectedItems}){
    const [pressed, isPressed] = useState(false);

    function selectedItem(){
        isPressed(!pressed);
        let copyItems = selectedItems.slice();
        if (copyItems.includes(item.category)){
            setSelectedItems((selectedItems) => copyItems.filter( element => element !== item.category));
        }
        else {
            setSelectedItems((selectedItems)=> [...selectedItems, item.category]);
        }
    }

    return <Pressable style={styles.unselectedcategory}
    onPress={selectedItem}
    key={item.category}>
    <Text 
    style={{
        fontWeight: 'bold',
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        backgroundColor: pressed ? '#495e57' :'#c4c4c4',
        color: pressed ? 'white' : 'black'
    }}>{item.category}</Text></Pressable>
}