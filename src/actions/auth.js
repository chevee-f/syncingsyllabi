import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const generateAuth = credentials => {
    try {
        return axios.post(`${getAPIBaseUrl()}Auth/GenerateAuth`,
        {
            "email": credentials.email,
            "password": credentials.password
        })
        .then((res) => {
            AsyncStorage.setItem('userToken', res.data.data.item.authToken)
            return res.data.data.item.authToken;
        })
      } catch (error) {
        Alert.alert('Invalid Email or Password.')
      }
};

export const signIn = credentials => {
    try {
            return async dispatch => {

                const userToken = await generateAuth(credentials);
                axios.post(`${getAPIBaseUrl()}User/LoginUser`,
                    {
                        "email": credentials.email,
                        "password": credentials.password
                    },
                    { 
                        headers: {"Authorization" : `Bearer ${userToken}`} 
                    }
                )
                .then((res) => {
                    dispatch({ type: SIGN_IN, payload: res.data.data.item });
                })
            }
    } catch (error) {
      
    }
};

export const signOut = () => {
    try {
        return async dispatch => {
            await AsyncStorage.removeItem('userToken');
            dispatch({ type: SIGN_OUT });
        }
      } catch (error) {
        Alert.alert('Unable to sign out. Please try again later.')
      }
};