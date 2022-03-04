import createDataContext from './CreateDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../../config/env";
import { Alert } from 'react-native';

const authReducer = (state, action) => {

  switch (action.type) {
    case 'retrieveToken':
      return {
                token: action.payload.token,
                isForCodeVerification: false
             };
    case 'signOut':
      return {
                token: null, 
                isSignOut: true
             };
    case 'signIn':
      return {
                token: action.payload.token,
                userId: action.payload.userId,
                isForCodeVerification: action.payload.isForCodeVerification
             };
    case 'signUp':
      return {
                token: null,
                userId: action.payload.userId,
                isForCodeVerification: true
     };
     case 'verifyUserCode':
      return {
                userId: action.payload.userId,
                isEmailVerified: action.payload.isEmailVerified,
                isForCodeVerification: action.payload.isForCodeVerification
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

          if(res.data.data.success){
            AsyncStorage.setItem('userToken', res.data.data.item.authToken)
            return res.data.data.item.authToken;
          }else{
            return null
          }
        })
      } catch (error) {
       Alert.alert(error.message)
      }
};

const retrieveToken = dispatch => {
  return async() => {
    let userToken = await AsyncStorage.getItem('userToken')
    dispatch({type: 'retrieveToken',
              payload: { token: userToken }
            });
  };
};

const signUp = dispatch => {
  return async({email, password}) => {
    try{

      const formData = new FormData();
      formData.append('Email', email); 
      formData.append('Password', password); 
    
      let res = await fetch(
        `${getAPIBaseUrl()}User/CreateUser`,
        {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();     
          dispatch({type: 'signUp',
                   payload: { userId: responseJson.data.item.id }
                  });
      
    }catch (error) {
      Alert.alert(error.message)
    }

  };
};


const signIn = dispatch => {
  return async({email, password}) => {
      try {
            axios.post(`${getAPIBaseUrl()}User/LoginUser`,
            {
                "email": email,
                "password": password
            })
            .then((res) => {
              if(res.data.data.item == null){
                Alert.alert('Incorrect Password','The password you entered is incorrect. Please try again.')
              }
              else if(res.data.data.item.isActive){
                const userToken = generateAuth(email,password);
                dispatch({type: 'signIn',
                          payload: { token: userToken, 
                                     userId: res.data.data.item.id,
                                     isForCodeVerification: false
                                   }
                        });
              }else{

                dispatch({type: 'signIn',
                          payload: { token: null, 
                                     userId: res.data.data.item.id,
                                     isForCodeVerification: true
                                   }
                        });
              }
            })
      } catch (error) {
        dispatch({ type: 'HAS_ERROR', payload: { hasError:true, errMsg: error.message } });  
      }
  };
};

const verifyUserCode = dispatch => {
  return async({userId, verificationCode}) => {
      try {      
            axios.post(`${getAPIBaseUrl()}User/VerifyUserCode`,
            {
                "UserId": userId,
                "CodeType": 1,
                "VerificationCode": verificationCode
            })
            .then((res) => {
                dispatch({type: 'verifyUserCode',
                          payload: { userId: userId,
                                     isEmailVerified: res.data.data.success,
                                     isForCodeVerification: false }
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
  {signIn, signOut, signUp, retrieveToken, verifyUserCode},
  {token: null, email: ''},
);