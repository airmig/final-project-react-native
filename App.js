
import {View, Text} from 'react-native';
import {styles} from './components/styles';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { getValue } from './utils/util';
import Loading from './components/Loading';
import Profile from './screens/Profile';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setIsLoggedIn] = useState(null);
  const [profileData, setProfileData] = useState({});

  useEffect(()=>{
    getValue('loggedIn').then(value => {
      setIsLoggedIn(value);
    })
    .catch(error => {
      console.error('Error getting value:', error);
      setIsLoggedIn(false);
    });
  },[]);

  return (
    <View style={styles.main}>
      <NavigationContainer>
        <Stack.Navigator>
          { loggedIn == null && <><Stack.Screen options={{ headerShown: false }}  name="Loading" component={Loading}/></>}
          {!loggedIn && <><Stack.Screen options={{ headerShown: false }}  name="Onboarding" component={Onboarding}/>
          <Stack.Screen options={{ headerShown: false }}  name="Profile" component={Profile}/><Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /></>}
          {loggedIn &&  <><Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /><Stack.Screen options={{ headerShown: false }}  name="Onboarding" component={Onboarding}/><Stack.Screen options={{ headerShown: false }}  name="Profile" component={Profile}/></>}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


