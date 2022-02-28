import axios from 'axios';
import { getAPIBaseUrl } from "../config/env";

export const GET_USER = 'GET_USER';

export const getUser = () => {
    try {
      return async dispatch => {
        const res = await axios.get(`${getAPIBaseUrl()}User/GetUserById/6`,
        { headers: {"Authorization" : `Bearer ${API_KEY}`} })
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
      // Add custom logic to handle errors 
    }
  };