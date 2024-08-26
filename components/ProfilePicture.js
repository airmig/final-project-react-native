import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const ProfilePicture = ({ navigation, image, size = 50, name }) => {
  const uri = image ? image.uri : null;
  const renderInitials = () => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  function gotoprofile(){
    navigation.navigate('Profile');
  }

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Pressable onPress={gotoprofile}><Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        /></Pressable>
      ) : (
        <Pressable onPress={gotoprofile}><Text style={[styles.initials, { fontSize: size / 2 }]}>{renderInitials()}</Text></Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfilePicture;
