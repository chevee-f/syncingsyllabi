import createDataContext from './CreateDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../../config/env";

const authReducer = (state, action) => {
  switch (action.type) {
    case 'retrieveToken':
      return {token: action.payload.token};
    case 'signOut':
      return {token: null, email: ''};
    case 'signIn':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const generateAuth = (email,password) => {
    try {
        return axios.post(`${getAPIBaseUrl()}Auth/GenerateAuth`,
        {
            "email": email,
            "password": password
        })
        .then((res) => {
            AsyncStorage.setItem('userToken', res.data.data.item.authToken)
            return res.data.data.item.authToken;
        })
      } catch (error) {
        Alert.alert('Invalid Email or Password.')
      }
};

const retrieveToken = dispatch => {
  return async() => {
    let userToken = await AsyncStorage.getItem('userToken')
    dispatch({type: 'retrieveToken',
              payload: {
                token: userToken
                },
            });
  };
};

const signup = dispatch => {
  return ({email, password}) => {
    console.log('Signup');
  };
};


const signIn = dispatch => {
  return async({email, password}) => {
      try {
            const userToken = await generateAuth(email,password);
            axios.post(`${getAPIBaseUrl()}User/LoginUser`,
                {
                    "email": email,
                    "password": password
                },
                { 
                    headers: {"Authorization" : `Bearer ${userToken}`} 
                }
            )
            .then((res) => {
                dispatch({type: 'signIn',
                          payload: {
                            token: userToken,
                            email,
                            },
                        });
            })
      } catch (error) {
        
      }
  };
};



const signOut = dispatch => {
  return async() => {
    await AsyncStorage.removeItem('userToken');
    dispatch({type: 'signOut'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut, signup, retrieveToken},
  {token: null, email: ''},
);