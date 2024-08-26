import {ScrollView, View, Text, Image, TextInput, Alert} from "react-native";
import { styles } from "../components/styles";
import {useState, useEffect} from "react";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ProfilePicture from "../components/ProfilePicture";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Checkbox } from "../components/Checkbox";
import { clearStorage, getValue, updateValues } from "../utils/util";
import Loading from "../components/Loading";

export default function Profile({navigation}){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]  = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(false);
    const [passwordChange, setPasswordChange] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log('result image:', result.cancelled);
        if (!result.cancelled)
            setImage(result);
    }

    useEffect(()=>{
        getValue('profileData').then(value => {
          console.log('loadingProfile', value);
          setEmail(value.email);
          setFirstName(value.name);
          setLastName(value.lastName);
          setPhoneNumber(value.phone);
          setSpecialOffers(value.offerstatus);
          setPasswordChange(value.passwordstatus);
          setOrderStatus(value.orderstatus);
          setNewsletter(value.newsletterstatus);
          setImage(value.image);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error getting values:', error);
        });
      },[firstName]);

    function isValidPhoneNumber(number){
        const tenDigitRegex = /^[0-9]{10}$/;
        return tenDigitRegex.test(number);
    }

    function logout() {
        clearStorage().then( value => {
            navigation.navigate('Onboarding');
        })
        .catch(error => {
            console.error('Error getting values:', error);
        });
    }
    function saveChanges() {
        const phoneCheck = isValidPhoneNumber(phone);
        const formData = {
            name: firstName,
            lastName: lastName,
            email: email,
            phone:  phone,
            orderstatus: orderStatus,
            passwordstatus: passwordChange,
            offerstatus: specialOffers,
            newsletterstatus: newsletter,
            image: image
        }

        if (!phoneCheck){
            Alert.alert('Cannot save changes invalid phone number.');
        }
        else {
            updateValues(formData).then(value=>{
                //do nothing
                console.log('data saved');
                navigation.navigate('Home', {
                    refresh: Date.now(),
                  });
            })
            .catch(error => {
                console.error('Error updating values:', error);
              });
        }
    }
    return <ScrollView>
        {isLoading && <Loading/>}
    {!isLoading && (<><View style={styles.profileheader}>
        <View style={[styles.profilecontainer, { width: 60, height: 60, borderRadius: 60 / 2 }]}>
         <Text style={styles.profilefototext}><Pressable onPress={()=>navigation.navigate('Home')}><AntDesign name="arrowleft" size={18} color="white"  /></Pressable></Text>
        </View>
        <Image style={styles.profilelogo} source={require('../assets/Logo.png')} />
        <ProfilePicture navigation={navigation} image={image} name={(firstName + ' ' + lastName)}/>
    </View>
    <View style={styles.profiledata}>
    <Text style={styles.personal}>Personal Information</Text>
    <View style={styles.avatarcontainer}>
        <ProfilePicture navigation={navigation} image={image} name={(firstName + ' ' + lastName)}/>
        <Pressable style={styles.profileinputselected} onPress={pickImage}><Text style={{color: 'white'}}>Change</Text></Pressable>
        <Pressable style={styles.profileinput} onPress={()=>{setImage(null)}}><Text>Remove</Text></Pressable>
    </View>
    <View>
        <Text>First name</Text>
        <TextInput style={styles.profileinput} value={firstName} onChangeText={setFirstName}/>
        <Text>Last name</Text>
        <TextInput  style={styles.profileinput} value={lastName} onChangeText={setLastName}/>
        <Text>Email</Text>
        <TextInput style={styles.profileinput} value={email} onChangeText={setEmail}/>
        <Text>Phone</Text>
        <MaskedTextInput
        type="custom"
        options={{
          mask: '(999)999-9999'
        }}
        onChangeText={(text, rawText) => {
          setPhoneNumber(rawText);
        }}
        value={phone}
        style={styles.profileinput}
        keyboardType="numeric"
        placeholder="(123)456-7890"
      />
        <Text style={styles.personalnotifications}>Email notifications</Text>
        <Checkbox label="Order statuses" checked={orderStatus} onChange={() => setOrderStatus(!orderStatus)}/>
        <Checkbox label="Password changes" checked={passwordChange} onChange={() => setPasswordChange(!passwordChange)}/>
        <Checkbox label="Special Offers" checked={specialOffers} onChange={() => setSpecialOffers(!specialOffers)}/>
        <Checkbox label="Newsletter" checked={newsletter} onChange={() => setNewsletter(!newsletter)}/>

        <Pressable onPress={logout} style={styles.logout}><Text style={{fontWeight: 'bold'}}>Log out</Text></Pressable>
        <View style={styles.avatarcontainer}>
        <Pressable onPress={()=>{navigation.navigate('Home')}} style={styles.profileinput}><Text>Discard changes</Text></Pressable>
        <Pressable onPress={saveChanges} style={styles.profileinputselected}><Text style={{color:'white'}}>Save changes</Text></Pressable>
        </View>
    </View>
    </View></>)}
    </ScrollView>
}