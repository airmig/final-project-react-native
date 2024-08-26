import {StyleSheet, FlatList, View, Text, Image} from "react-native";


const Separator = () => <View style={documentStyles.separator} />;
export default function MenuItems({menuItems}){

    function renderItem(record){
        let item = record.item;
         return <View style={documentStyles.container}>
        <Text style={documentStyles.itemtitle}>
            {item.name}
        </Text>
        <View style={documentStyles.itemview}>
            <Text style={documentStyles.itemcontainer}>
                <Text>{item.description}</Text>{"\n"}
                <Text style={documentStyles.itempricetext}>${item.price}</Text>
            </Text>
            <Image 
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}}
            style={documentStyles.itemimage}
            />
        </View></View>
    }

    return <>
        <View>
            <FlatList 
            renderItem={renderItem} 
            data={menuItems}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={Separator}
            />
        </View>
    </>
}

const documentStyles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        flex: 1
    },
    separator:{
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'black'
    },
    itemtitle: {
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
        width: '40%'
    },
    itemview: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop: 0,
        marginBottom: 20,
        alignItems: 'center',
    },
    itemcontainer: {
        width: '50%'
    },
    itempricetext: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemimage: {
        resizeMode: 'cover',
        height: 100,
        width: 180
    }
});