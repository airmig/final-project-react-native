import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { useEffect } from 'react';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    main: {
        flex: 1,
        backgroundColor: '#DEE3E9'
    },
    header: {
        height: 100
    },
    logo: {
        height: 80,
        width: '100%',
        margin: 10,
        resizeMode: 'contain'
    },
    onboard: {
        backgroundColor:  '#cbd2d9',
        alignItems: 'center',
        fontSize: 30
    },
    onboardquote: {
        backgroundColor:  '#cbd2d9',
        minHeight: 260
    },
    onboardheader: {
        paddingTop: 40,
        fontSize: 30,
    },
    onboardtext: {
        fontSize: 30,
    },
    inputs: {
        alignItems: 'center',
        width: '80%',
        backgroundColor:  '#cbd2d9',
        paddingBottom: 40
    },
    input: {
        marginTop: 10,
        fontSize: 30,
        height: 80,
        width: '100%',
        borderColor: '#000', 
        borderWidth: 1, 
        borderRadius: 10, 
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    onboardbutton: {
        alignItems: 'flex-end'
    },
    button: {
        marginTop: 15,
        marginRight: 30,
        backgroundColor:'#cbd2d9',
        width: 280,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttontext: {
        fontSize: 30
    },
    buttongood: {
        marginTop: 60,
        marginRight: 30,
        backgroundColor:'#495e57',
        width: 280,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttontextgood: {
        fontSize: 40,
        color: 'white'
    },
    loading: {
        flex: 8,
        alignItems: 'center',
        marginTop: 150
    },
    loadingtext: {
        fontSize: 60,
    },
    loadingwait: {
        fontSize: 50,
    },
    profilecontainer: {
        backgroundColor: '#495e57',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
    profileheader: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop: 30,
        flex: 1,
        padding: 10
    },
    profilearrow: {
    },
    profilefototext: {
        backgroundColor: '#495e57',
        borderRadius: 50,
        fontSize: 30,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white',
        paddingTop: 5
    },
    profilelogo: {
        height: 60,
        width: 260,
        resizeMode: 'contain',
        marginLeft: 10
    },
    profilelogohome: {
        height: 60,
        width: 260,
        resizeMode: 'contain',
        marginLeft: 70
    },
    profiledata: {
        borderWidth: 1, 
        borderRadius: 10, 
        padding: 20,
        margin: 5
    },
    personal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    personalnotifications: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    avatarcontainer: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop: 8,
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileinput:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        padding: 10,
        borderRadius: 10
    },
    profileinputselected:{
        margin: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#495e57',
    },
    logout: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F4ce14',
        padding: 15,
        alignItems: 'center',
    },
    hero: {
        backgroundColor: '#495e57',
        marginTop: 55
    },
    herotitle: {
        marginLeft: 20,
        marginTop: 5,
        fontSize: 30,
        color: '#F4ce14'
    },
    herosubtitle: {
        color: 'white',
        fontSize: 15,
        marginLeft: 20
    },
    herotext: {
        color: 'white',
        marginLeft: 10,
        width: '40%'
    },
    heroimage: {
        resizeMode: 'contain',
        width: '40%',
        height: 140,
        borderRadius: 10,
        marginLeft: 40
    },
    herocontainer: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop: 0,
        marginLeft: 10,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#495e57'
    },
    ordertitle: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 5
    },
    domcontainer: {
        flex: 0.46
    }
});