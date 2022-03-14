import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";

export const GET_USER = 'GET_USER';
export const GET_USER_BY_EMAIL = 'GET_USER_BY_EMAIL';

export const getUser = () => {
    try {
      return async dispatch => {
        let userToken = await AsyncStorage.getItem('userToken')
        const res = await axios.get(`${getAPIBaseUrl()}User/GetUserById/6`,
        { headers: {"Authorization" : `Bearer ${userToken}`} })
        if (res.data.data.item) {
          dispatch({
            type: GET_USER,
            payload: res.data.data.item,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {

    }
  };

export const getUserByEmail = email => {
  try {
    return async dispatch => {
      let userToken = await AsyncStorage.getItem('userToken')
      const res = await axios.get(`${getAPIBaseUrl()}User/GetUserByEmail/${email}`,
      { headers: {"Authorization" : `Bearer ${userToken}`} })
        dispatch({
          type: GET_USER_BY_EMAIL,
          payload: res.data.data.item,
        });
    };
  } catch (error) {

  }
};