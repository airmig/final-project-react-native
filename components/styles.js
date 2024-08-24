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
        fontSize: 40
    },
    onboardquote: {
        backgroundColor:  '#cbd2d9',
        minHeight: 260
    },
    onboardheader: {
        paddingTop: 40,
        fontSize: 40,
    },
    onboardtext: {
        fontSize: 40,
    },
    inputs: {
        alignItems: 'center',
        width: '80%',
        backgroundColor:  '#cbd2d9',
        paddingBottom: 40
    },
    input: {
        marginTop: 10,
        fontSize: 40,
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
        marginTop: 60,
        marginRight: 30,
        backgroundColor:'#cbd2d9',
        width: 280,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttontext: {
        fontSize: 40
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
    }
});