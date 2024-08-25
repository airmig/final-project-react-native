import AsyncStorage from "@react-native-async-storage/async-storage";
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
  };
  export const validateFirstName = (name) => {
    if (name.length === 0) {
        return false; 
    }
    return /^[A-Za-z]+$/.test(name);
}

export const getValue = async(key) => {
  try{
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('No value found for the key:', key);
      return false;
    }
  }
  catch(error){
    console.error('Error getting value:', error);
    return false;
  }
}

export const setValue = async(key, value) => {
  try{
    console.log('saving', value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  catch(error){
    console.error('Error setting value:', error);
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // Handle error
  }
 }

 export const updateValues = async (values) => {
  try {
    const jsonValue = JSON.stringify(values);
    console.log('saving', jsonValue);
    await AsyncStorage.setItem("profileData", jsonValue);
  } catch(e) {
   console.error('Error updating values', e);
  }
}
