import { TextInput, View, Image, Text, Pressable, FlatList} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import { styles } from "../components/styles";
import ProfilePicture from "../components/ProfilePicture";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getValue, API_URL } from "../utils/util";
import { useRoute } from "@react-navigation/native";
import { createTable, getCategoryItems, getMenuItems, saveMenuItems, filterByQueryAndCategories } from "../utils/database";
import Selector from "../components/Selector";
import { setStatusBarStyle } from "expo-status-bar";
import { debounce } from 'lodash';

export default function Home({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const route = useRoute();
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const Separator = () => <View style={styles.separator} />;
    const [pressedItem, setPressedItem] = useState(null);
    const [press, setPress] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [query, setQuery] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);

    const handlePressIn = (category) => {
        setPressedItem(category);
    };
    
    const handlePressOut = () => {
        // Do nothing, pressed state remains
    };

    async function getMenu(){
        try{
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.menu;
        }
        catch(err){
            console.error('Error fetching menu.', err);
        }

    }

    async function populateData(){
        try {
          await createTable();
          let dbMenuItems = [];
          let dbCategories = [];
          
          dbMenuItems = await getMenuItems()
          .then( 
            dbCategories = await getCategoryItems()
          );
          if (!dbMenuItems.length) {
            const internetMenuItems =  await getMenu();
            await saveMenuItems(internetMenuItems);
            dbCategories = await getCategoryItems();
            dbMenuItems = internetMenuItems;
          }
          else {
            console.log('Menu retrieved from database');
          }
          setMenuItems(dbMenuItems);
          setCategories(dbCategories);

        } catch (e) {
          // Handle error
          console.error(e.message);
        }
      }

    useEffect(() => {
        getValue('profileData').then(value => {
            setEmail(value.email);
            setFirstName(value.name);
            setLastName(value.lastName);
            setPhoneNumber(value.phone);
            setSpecialOffers(value.offerstatus);
            setPasswordChange(value.passwordstatus);
            setOrderStatus(value.orderstatus);
            setNewsletter(value.newsletterstatus);
            setImage(value.image);
            setIsLoading(false);
            populateData();
        })
            .catch(error => {
                console.error('Error getting values:', error);
            });
        
    }, []);

    const search = useCallback(() => { 
        filterByQueryAndCategories(query, selectedItems).then((result)=>{
            setMenuItems(result);
            }
        );
    });

    const debouncedSearch = useCallback(debounce(search, 500), [search]);

    useEffect(()=>{
        if (firstLoad){
            setFirstLoad(false);
        }
        else{
            debouncedSearch();
        }
    }
    ,[selectedItems, query]);

    useEffect(() => {
        if (route.params?.refresh) {
            setIsLoading(true);
            getValue('profileData').then(value => {
                setImage(value.image);
                setIsLoading(false);
                debouncedSearch();
            })
                .catch(error => {
                    console.error('Error getting values:', error);
                });
        }
    }, [route.params?.refresh]);

    function renderItem(record){
        let item = record.item;
         return <View style={{flex: 0}}>
        <Text style={styles.itemtitle}>
            {item.name}
        </Text>
        <View style={styles.itemview}>
            <Text style={styles.itemcontainer}>
                <Text>{item.description}</Text>{"\n\n"}
                <Text style={styles.itempricetext}>${item.price}</Text>
            </Text>
            <Image 
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}}
            style={styles.itemimage}
            />
        </View>
        </View>
    }

    return <View style={styles.domcontainer}>
        {isLoading && <Loading />}
        {!isLoading && (<><View style={styles.profileheader}>
            <Image style={styles.profilelogohome} source={require('../assets/Logo.png')} />
            <ProfilePicture navigation={navigation} image={image} name={(firstName + ' ' + lastName)} />
        </View>
        <View style={styles.hero}>
                <Text style={styles.herotitle}>Little Lemon</Text>
                <Text style={styles.herosubtitle}>Chicago</Text>
                <View style={styles.herocontainer}>
                    <Text style={styles.herotext}>We are a famility owned
                        Mediterranean restaurant,
                        focused on traditional
                        recipes served with a
                        modern twist.
                    </Text>
                    <Image style={styles.heroimage} source={require('../assets/Heroimage.png')} />
                </View>
                <View style={styles.searchbar}>
                    <AntDesign name="search1" size={30} color="black"  />
                     <TextInput placeholder="Enter a text for dish" style={styles.searchtext} value={query} onChangeText={setQuery}/>
                </View>
            </View>
            <Text style={styles.ordertitle}>ORDER FOR DELIVERY!</Text>
                <View style={styles.filterview}>
                    {
                    categories.map((item) =>  {
                    return  <Selector key={item.category} item={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
                    })
                }
                </View>
            <View style={{flex: 1, flexGrow: 1}}>
                <FlatList
                renderItem={renderItem} 
                data={Array.isArray(menuItems) ? menuItems : []}
                keyExtractor={item => item.name}
                ItemSeparatorComponent={Separator}
                />
            </View>
        </>)}
    </View>
}