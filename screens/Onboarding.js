import Header from "../components/Header";
import {TextInput, View, Text, Pressable, ScrollView} from 'react-native';
import { useState, useEffect } from "react";
import { styles } from "../components/styles";
import { validateEmail, validateFirstName } from "../utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getValue } from "../utils/util";

export default function Onboarding({navigation}){
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [validFields, setValidFields] = useState(false);

    useEffect(()=>{
        if (validateFirstName(userName) && validateEmail(email)){
            setValidFields(true);
        }
        else{
            setValidFields(false);
        }
    },[email, userName]);

    useEffect(()=>{
        getValue('profileData').then(value => {
          console.log(Object.keys(value).length);
          if (Object.keys(value).length > 0)
            navigation.navigate('Profile');
        })
        .catch(error => {
          console.error('Error getting values:', error);
        });
      },[]);

    function validInputFields(){
        console.log(validateEmail(email));
        return userName.length > 0 && !validateEmail(email);
    }

    function submitProfile(){
        console.log("submitted");
        const formData = {
            name: userName,
            email: email
        }
        const profileData =  ["profileData", JSON.stringify(formData)];
        const loggedIn = ["loggedIn", JSON.stringify(true)];
        (async () => { 
            try{
              await AsyncStorage.multiSet([profileData, loggedIn]);
            }
            catch(err){ console.error(err.message);
            }
        })().then( () => {
            setEmail('');
            setUserName('');
            navigation.navigate('Profile');
          })
          .catch(error => {
            console.error('Error setting values:', error);
            navigation.navigate('Onboarding');
          });
    }

    return <ScrollView><Header/>
    <View style={styles.onboard}>
        <View style={styles.onboardquote}>
        <Text style={styles.onboardheader}>Let us get to know you</Text>
        </View>
        <View style={styles.inputs}>
        <Text style={styles.onboardtext}>First Name</Text>
        <TextInput style={styles.input}  onChangeText={setUserName} value={userName}/>
        <Text style={styles.onboardtext}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
    </View>
    <View style={styles.onboardbutton}>
    { !validFields && <Pressable style={styles.button}><Text style={styles.buttontext}>Next</Text></Pressable>}
    { validFields && <Pressable onPress={submitProfile} style={styles.buttongood}><Text style={styles.buttontextgood}>Next</Text></Pressable>}

    </View>
    </ScrollView>
    ;
}