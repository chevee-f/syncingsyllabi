import React, { useState,useContext,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { getUserByEmail } from '../../actions/user';
import { Alert,Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';  
import { getWebClientId } from "../../config/env";

const method = (navigation) => {

    const errors = useSelector((state) => state.errors);
    const {user} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const {state, signIn, signUp} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const [isFocused, setIsFocused] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(false);
    const [isGoogleSignIn, isSetGoogleSignIn] = React.useState(false);
    const [userInfo, setuserInfo] = React.useState([]);

    const [inputValidation, setInputValidation] = React.useState({
        isValidEmail: true,
        isValidPassword: true,
        emailErrMsg: '',
        passErrMsg: ''
    });

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }
    const fetchUserByEmail = (email) => dispatch(getUserByEmail(email));

    const handleSignInSignUp = async() => {
        if(inputValidation.isValidEmail && inputValidation.isValidPassword){
            setIsLoading(true)
            if(isSignUp){
                await signUp({email, password}) 
                setIsLoading(false)
                Alert.alert("2-Step Verification","We have sent you the code for verification. Please check your email.",
                        [{ text: "OK",  onPress: () => {
                            navigation.navigate('CodeVerificationScreen')
                        } }],
                        { cancelable: false });
            }else{
                await fetchUserByEmail(email)
                if(user == null){
                    setIsLoading(false)
                    Alert.alert('Account',"Account doesn't exist. Enter a different account or get a new one.");
                }
                await signIn({email, password, isGoogleSignIn})
                setIsLoading(false)
            }
        } 
    }

    const handleGoogleSignIn = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            const credential = auth.GoogleAuthProvider.credential(
              idToken,
              accessToken,
            );
            await auth().signInWithCredential(credential);
            isSetGoogleSignIn(true)
            await signIn({email, password, isGoogleSignIn})
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              Alert.alert('Signin in progress');
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              Alert.alert('Play services not available or outdated');
              // play services not available or outdated
            } else {
              Alert.alert(error.message)
              // some other error happened
            }
          }
    }
    
    function onAuthStateChanged(user) {
        setuserInfo(user);
        //if (user){
        //    Alert.alert(JSON.stringify(userInfo))
        //}
    }
    
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], 
            webClientId: getWebClientId(Platform.OS),
            offlineAccess: true
        });
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
    }, []);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const handleValidEmail = () => {
        if( email.trim().length === 0 ) {
            setInputValidation({
                ...inputValidation,
                isValidEmail: false,
                emailErrMsg: 'Email field cannot be empty'
            });
            return false
        }else if(!validateEmail(email)){
            setInputValidation({
                ...inputValidation,
                isValidEmail: false,
                emailErrMsg: 'Please enter a valid email address'
            });
            return false
        }else {
            fetchUserByEmail(email)
            if(user !== null && isSignUp){
                setInputValidation({
                    ...inputValidation,
                    isValidEmail: false,
                    emailErrMsg: 'Email already exists. Please use other email.'
                });
                return false
            }else{
                setInputValidation({
                    ...inputValidation,
                    isValidEmail: true,
                    emailErrMsg: ''
                });
                return true
            }
        }
    }

    const handleValidPassword = () => {
        if(password.trim().length === 0) {
            setInputValidation({
                ...inputValidation,
                isValidPassword: false,
                passErrMsg: 'Password field cannot be empty'
            });
            return false
        }else if(password.trim().length < 4){
            setInputValidation({
                ...inputValidation,
                isValidPassword: false,
                passErrMsg: 'Please enter at least 4 characters'
            });
            return false
        }else{
            setInputValidation({
                ...inputValidation,
                isValidPassword: true,
                passErrMsg: ''
            });
            return true
        }
    }

    return {
        email,
        password,
        secureTextEntry,
        isLoading,
        isFocused,
        isSignUp,
        inputValidation,
        updateSecureTextEntry,
        handleSignInSignUp,
        handleValidEmail,
        handleValidPassword,
        handleGoogleSignIn,
        setIsSignUp,
        setIsFocused,
        setPassword,
        setEmail
    };
  };
  
  export default method;