import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';

export const GET_USER = 'GET_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';
export const UPDATE_USER = 'UPDATE_USER';

export const getUser = (userId, token) => {
    try {
      return async dispatch => {
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

export const updateUserTimeZone = (userId, token) => {
  // console.log()
  // axios.post(`${getAPIBaseUrl()}Assignment/UpdateUserTimeZone`,
  //   {
  //     "userId": userId,
  //     "timeZone": "string"
  //   },
  // { headers: {"Authorization" : `Bearer ${token}`} })
  // .then((res) => {
  //     dispatch({ type: 'CLEAR_ERROR', payload: [] });
  //     console.log("CALLING complete assignments")
  //     dispatch(getAssignmentsByUser(userId, token));
  // })
}

export const updateUser = (profile, userId, token) => {
    return async dispatch => {
      try{  
        const formData = new FormData();
        formData.append('UserId', userId)
        if(profile.firstName !== null) formData.append('FirstName', profile.firstName); 
        if(profile.lastName !== null) formData.append('LastName', profile.lastName); 
        if(profile.email !== null) formData.append('Email', profile.email); 
        if(profile.school !== null) formData.append('School', profile.school); 
        if(profile.dateOfBirth !== null) formData.append('DateOfBirth', profile.dateOfBirth); 
        if(profile.major !== null) formData.append('Major', profile.major); 
        if(profile.image !== null){
          formData.append('ImageFile', {uri: profile.image,
                                        type: profile.imgType,
                                        name: profile.imgFileName
                                       })
        }
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

export const deleteUser = (token, userId, isActive) => {
  try {
    return async dispatch => {
      const res = await axios.get(`${getAPIBaseUrl()}User/DeleteUserAccount/${userId}/${isActive}`,
      { headers: {"Authorization" : `Bearer ${token}`} })
        dispatch({
          type: DELETE_USER,
          payload: res.data.data.item,
        });
    };
  } catch (error) {
    Alert.alert(JSON.stringify(error.message))
  }
}