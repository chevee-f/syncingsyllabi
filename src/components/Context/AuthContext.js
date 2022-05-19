import createDataContext from './CreateDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../../config/env";
import { Alert } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';  
import { LoginManager } from 'react-native-fbsdk';
const authReducer = (state, action) => {

  switch (action.type) {
    case 'retrieveToken':
      return {
                token: action.payload.token,
                userId: action.payload.userId,
                isForCodeVerification: false,
                isLoggedIn: action.payload.isLoggedIn,
                isDarkTheme: action.payload.isDarkTheme
             };
    case 'signOut':
      return {
                token: null, 
                isSignOut: true,
                isLoggedIn: false
             };
    case 'signIn':
      return {
                token: action.payload.token,
                userId: action.payload.userId,
                email: action.payload.email,
                isForCodeVerification: action.payload.isForCodeVerification,
                isLoggedIn: true,
                isDarkTheme: 'false'
             };
    case 'signUp':
      return {
                token: action.payload.token,
                userId: action.payload.userId,
                email: action.payload.email,
                isForCodeVerification: action.payload.isForCodeVerification,
                codeType: 1,
                isGoogle: action.payload.isGoogle
     };
     case 'verifyUserCode':
      return {
                userId: action.payload.userId,
                email: action.payload.email,
                isEmailVerified: action.payload.isEmailVerified,
                codeType: action.payload.codeType,
                isForCodeVerification: action.payload.isForCodeVerification,
                currentPassword: action.payload.currentPassword,
                token: action.payload.token
     };
     case 'recoverAccount':
      return {
                token: action.payload.token,
                userId: action.payload.userId,
                email: action.payload.email,
                isForCodeVerification: action.payload.isForCodeVerification,
                codeType: 2
             };
     case 'resetPassword':
      return {
                userId: action.payload.userId,
                isSuccessChangePassword: action.payload.isSuccessChangePassword
             };
     case 'setTheme':
      return {
                isDarkTheme: action.payload.isDarkTheme
             };
    default:
      return state;
  }
  
};

const generateAuth = (email,password,isGoogleSignIn) => {
    try {
        return axios.post(`${getAPIBaseUrl()}Auth/GenerateAuth`,
        {
            "email": email,
            "password": !isGoogleSignIn ? password : null,
            "isGoogle": isGoogleSignIn
        })
        .then((res) => {
          if(res.data.data.success){

            if(isGoogleSignIn) AsyncStorage.setItem('isGoogleSignIn', 'true')

            const userToken = ["userToken",res.data.data.item.authToken]
            const userId = ["userId", JSON.stringify(res.data.data.item.userId)]
            const isLoggedIn = ["isLoggedIn", 'true']
            AsyncStorage.multiSet([userToken, userId, isLoggedIn])

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
    var obj;
    await AsyncStorage.multiGet(["userToken",
                                 "userId",
                                 "isLoggedIn",
                                 "isDarkTheme"])
    .then(response => {
        obj = {
          userToken: response[0][1],
          userId: response[1][1],
          isLoggedIn: response[2][1],
          isDarkTheme: response[3][1],
        }
    })
    dispatch({type: 'retrieveToken',
              payload: { token: obj.userToken, 
                         userId: obj.userId, 
                         isLoggedIn: obj.isLoggedIn,
                         isDarkTheme: obj.isDarkTheme === null ? 'false' : obj.isDarkTheme
                       }
            });
  };
};


const signUp = dispatch => {
  return async({email, password, isGoogleSignIn}) => {
    try{

      let userInfo = await getUserInfo(email)
      if(userInfo != null){
        Alert.alert('Account','Email already exists. Please use other email.')
        return
      }

      let userToken = '';
      const formData = new FormData();
      formData.append('Email', email); 
      if(!isGoogleSignIn) formData.append('Password', password); 
      formData.append('IsGoogle', isGoogleSignIn); 

      let res = await fetch(`${getAPIBaseUrl()}User/CreateUser`,
                              {
                                method: 'post',
                                headers: {
                                  'Content-Type': 'multipart/form-data',
                                },
                                body: formData
                              })

      let responseJson = await res.json();   
      if(!isGoogleSignIn){
          Alert.alert("2-Step Verification","We have sent you the code for verification. Please check your email."); 
      }else{
        userToken = await generateAuth(email, null, isGoogleSignIn);
      }
      dispatch({type: 'signUp',
                payload: { userId: responseJson.data.item.id, 
                           email: email,
                           isForCodeVerification: !isGoogleSignIn,
                           isGoogle: isGoogleSignIn,
                           token: isGoogleSignIn ? userToken : null
                         }
              });
      
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

const sendVerificationCode = dispatch => {
  return async({ emailAddress, codeType }) => {
      try {
            let userInfo = await getUserInfo(emailAddress)
            if(userInfo == null){
              Alert.alert('Account','Account does not exist. Enter a different account or get a new one.')
              return
            }
            axios.post(`${getAPIBaseUrl()}Email/SendEmailVerificationCode`,
            {
                "userId": userInfo.id,
                "codeType": codeType,
                "isResend": userInfo.isResetPassword
            })
            .then((res) => {
              if(codeType === 2){
                Alert.alert("Reset Password","We have sent you the code to reset your password. Please check your email."); 
              }else{
                Alert.alert("We have sent you the code for verification. Please check your email.")
              }
              dispatch({type: 'recoverAccount',
                        payload: { token: null, 
                                   userId: userInfo.id,
                                   email: emailAddress,
                                   isForCodeVerification: true
                                 }
                      });
            })
            
      } catch (error) {
        dispatch({ type: 'HAS_ERROR', payload: { hasError:true, errMsg: error.message } });  
      }
  };
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
                const userToken = await generateAuth(email, password, isGoogleSignIn);
                dispatch({type: 'signIn',
                          payload: {token: userToken, 
                                    email: email,
                                    userId: res.data.data.item.id,
                                    isForCodeVerification: false
                          }});
              }else{
                dispatch({type: 'signIn',
                          payload: {token: null, 
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
  return async({userId, verificationCode, codeType, email}) => {
      try {
            let userInfo = await getUserInfo(email)    
            let userToken = ''
            axios.post(`${getAPIBaseUrl()}User/VerifyUserCode`,
            {
                "UserId": userId,
                "CodeType": codeType,
                "VerificationCode": verificationCode
            })
            .then(async(res) => {
                if(res.data.data.success){
                  let currentPassword = ''
                  if(codeType === 2){
                    currentPassword = await decryptPassword(userInfo.password)
                    Alert.alert("Email Verification","Success! You may now reset your password")
                  }else{
                    userToken = await generateAuth(email, null, true);
                  }
                  dispatch({type: 'verifyUserCode',
                            payload: { userId: userId,
                                       email: email,
                                       isEmailVerified: res.data.data.success,
                                       codeType: codeType,
                                       isForCodeVerification: false,
                                       currentPassword: currentPassword,
                                       token: userToken
                                    }
                          });
                }
            })
      } catch (error) {

      }
  };
};

const changePassword = dispatch => {
  return async({userId, currentPassword, updatedPassword}) => {
      try {    
            axios.post(`${getAPIBaseUrl()}User/ResetPassword`,
            {
                "userId": userId,
                "currentPassword": currentPassword,
                "updatedPassword": updatedPassword
            })
            .then(async(res) => {
                if(res.data.data.success){
                  dispatch({type: 'resetPassword',
                            payload: { userId: userId,
                                       isSuccessChangePassword: true
                                     }
                          });
                }
            })
      } catch (error) {
      }
  };
};

const decryptPassword = (password) => {
  try {
      return axios.post(`${getAPIBaseUrl()}User/DecryptPassword`,
      {
          "decryptPassword": password
      })
      .then((res) => {
        return res.data.data.decryptedPassword
      })
  } catch (error) {
  }
};

const signOut = dispatch => {
  return async() => {
    let isGoogleSignIn = await AsyncStorage.getItem('isGoogleSignIn')
    if(isGoogleSignIn){
      try{
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        auth().signOut()
      }catch(e){
        await LoginManager.logOut();
      }
    }

    await AsyncStorage.removeItem('userToken');
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    dispatch({type: 'signOut'});
  };
};

const setTheme = dispatch => {
  return async({isDarkTheme}) => {
    await AsyncStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme))
    dispatch({type: 'setTheme', payload: { isDarkTheme: JSON.stringify(isDarkTheme) }});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  { signIn, 
    signOut, 
    signUp, 
    retrieveToken, 
    verifyUserCode,
    changePassword,
    sendVerificationCode,
    setTheme },
  {token: null, email: ''},
);