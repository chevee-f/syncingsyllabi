import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';

export const GET_USER = 'GET_USER';
export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';
export const UPDATE_USER = 'UPDATE_USER';

export const getUser = (userId) => {
    try {
      return async dispatch => {
        let token = await AsyncStorage.getItem('userToken')
        const res = await axios.get(`${getAPIBaseUrl()}User/GetUserById/${userId}`,
        { headers: {"Authorization" : `Bearer ${token}`} })
          dispatch({
            type: GET_USER,
            payload: res.data.data.item,
          });
      };
    } catch (error) {
      Alert.alert(JSON.stringify(error.message))
    }
  };

export const getUserByEmail = email => {
  try {
    return async dispatch => {
      const res = await axios.get(`${getAPIBaseUrl()}User/GetUserByEmail/${email}`)
        dispatch({
          type: GET_USER_BY_EMAIL,
          payload: res.data.data.item,
        });
    };
  } catch (error) {

  }
};

export const updateUser = (profile, userId, token) => {
    return async dispatch => {
      try{  
        
        const formData = new FormData();
        formData.append('UserId', userId)
        formData.append('FirstName', profile.firstName); 
        formData.append('LastName', profile.lastName); 
        formData.append('Email', profile.email); 
        formData.append('School', profile.school); 
        formData.append('DateOfBirth', profile.dateOfBirth); 
        formData.append('Major', profile.major); 
  
        let res = await fetch(`${getAPIBaseUrl()}User/UpdateUser`,{
                  method: 'post',
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`
                  },
                  body: formData
               })
  
        let responseJson = await res.json();   
        dispatch({ type: 'CLEAR_ERROR', payload: [] });
        dispatch({
          type: UPDATE_USER,
          payload: responseJson.data.item,
        });
        
      }catch (error) {
        dispatch({ type: 'HAS_ERROR', payload: error.message });
      }
    };
};