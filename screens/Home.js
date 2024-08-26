import { ScrollView, View, Image, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { styles } from "../components/styles";
import ProfilePicture from "../components/ProfilePicture";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getValue, API_URL } from "../utils/util";
import { useRoute } from "@react-navigation/native";
import MenuItems from "../components/MenuItems";
import { createTable, getMenuItems, saveMenuItems } from "../utils/database";

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

    async function getMenu(){
        try{
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data);
            return data.menu;
        }
        catch(err){
            console.error('Error fetching menu.', err);
        }

    }

    async function populateData(){
        try {
          await createTable();
          let dbMenuItems = await getMenuItems();
          console.log('db select', dbMenuItems)
          if (!dbMenuItems.length) {
            console.log('getting menu from internet');
            const internetMenuItems =  await getMenu();
            saveMenuItems(internetMenuItems);
            dbMenuItems = internetMenuItems;
          }
          else {
            console.log('Menu retrieved from database');
          }
          setMenuItems(dbMenuItems);

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

    useEffect(() => {
        if (route.params?.refresh) {
            setIsLoading(true);
            console.log('Refreshing screen...');
            getValue('profileData').then(value => {
                setImage(value.image);
                setIsLoading(false);
            })
                .catch(error => {
                    console.error('Error getting values:', error);
                });
        }
    }, [route.params?.refresh]);

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
            </View>
            <View>
                <Text style={styles.ordertitle}>ORDER FOR DELIVERY!</Text>
                <MenuItems menuItems={menuItems}/>
            </View>

        </>)}
    </View>
}