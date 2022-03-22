import createDataContext from './CreateDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../../config/env";
import { Alert } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';  

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
                email: action.payload.email,
                isForCodeVerification: action.payload.isForCodeVerification
             };
    case 'signUp':
      return {
                token: null,
                userId: action.payload.userId,
                email: action.payload.email,
                isForCodeVerification: action.payload.isForCodeVerification
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

const generateAuth = (email,password,isGoogleSignIn) => {
    try {
      alert(JSON.stringify(isGoogleSignIn))

        return axios.post(`${getAPIBaseUrl()}Auth/GenerateAuth`,
        {
            "email": email,
            "password": !isGoogleSignIn ? password : null,
            "isGoogle": isGoogleSignIn
        })
        .then((res) => {
          if(res.data.data.success){
            AsyncStorage.setItem('userToken', res.data.data.item.authToken)
            return res.data.data.item;
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
  return async({email, password, isGoogleSignIn, navigation}) => {
    try{
      if(await getUserInfo(email) != null){
        Alert.alert('Account','Email already exists. Please use other email.')
        return
      }
      const formData = new FormData();
      formData.append('Email', email); 
      if(!isGoogleSignIn) formData.append('Password', password); 
      formData.append('IsGoogle', isGoogleSignIn); 
    
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
      if(!isGoogleSignIn){
        Alert.alert("2-Step Verification","We have sent you the code for verification. Please check your email.",
        [{ text: "OK",  onPress: () => { navigation.navigate('CodeVerificationScreen')}}],
        { cancelable: false }); 
      }else{
        navigation.navigate('SignUpConfirmationScreen')
      }
      
      dispatch({type: 'signUp',
                payload: { userId: responseJson.data.item.id, 
                           email: email,
                           isForCodeVerification: !isGoogleSignIn
                }});
      
    }catch (error) {
      Alert.alert(error.message)
    }

  };
};

const getUserInfo = async(email) => {
  try {
      const res = await axios.get(`${getAPIBaseUrl()}User/GetUserByEmail/${email}`)
      return res.data.data.item
  } catch (error) {

  }
};

const signIn = dispatch => {
  return async({email, password, isGoogleSignIn}) => {
      try {
            if(await getUserInfo(email) == null){
              Alert.alert('Account','Account does not exist. Enter a different account or get a new one.')
              return
            }

            axios.post(`${getAPIBaseUrl()}User/LoginUser`,
            {
                "email": email,
                "password": !isGoogleSignIn ? password : null,
                "IsGoogle": isGoogleSignIn
            })
            .then(async(res) => {
              if(res.data.data.item == null){
                Alert.alert('Incorrect Password','The password you entered is incorrect. Please try again.')
              }
              else if(res.data.data.item.isActive){
                if(isGoogleSignIn) await AsyncStorage.setItem('isGoogleSignIn', true)
                const userToken = await generateAuth(email, password, isGoogleSignIn);
                dispatch({type: 'signIn',
                          payload: { token: userToken, 
                                      email: email,
                                      userId: res.data.data.item.id,
                                      isForCodeVerification: false
                          }});
              }else{

                dispatch({type: 'signIn',
                          payload: { token: null, 
                                      userId: res.data.data.item.id,
                                      email: email,
                                      isForCodeVerification: true
                        }});
              }
            })
            
      } catch (error) {
        dispatch({ type: 'HAS_ERROR', payload: { hasError:true, errMsg: error.message } });  
      }
  };
};

const verifyUserCode = dispatch => {
  return async({userId, verificationCode, email}) => {
      try {    
            axios.post(`${getAPIBaseUrl()}User/VerifyUserCode`,
            {
                "UserId": userId,
                "CodeType": 1,
                "VerificationCode": verificationCode
            })
            .then(async(res) => {
                let userInfo = getUserInfo(email)
                let isGoogleSignIn = false
                if(userInfo.isGoogle !== null && userInfo.isGoogle){
                  isGoogleSignIn = true
                  AsyncStorage.setItem('isGoogleSignIn', true)
                }
                //await generateAuth(email, password, isGoogleSignIn);
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
    let isGoogleSignIn = await AsyncStorage.getItem('isGoogleSignIn')
    if(isGoogleSignIn){
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth().signOut()
    }

    await AsyncStorage.removeItem('userToken');
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    dispatch({type: 'signOut'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut, signUp, retrieveToken, verifyUserCode},
  {token: null, email: ''},
);