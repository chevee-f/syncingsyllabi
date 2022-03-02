import React, { useState,useContext } from 'react';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (navigation) => {

    const {state, signIn} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const [isFocused, setIsFocused] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(true);

    const [inputValidation, setInputValidation] = React.useState({
        isValidEmail: true,
        isValidPassword: true,
        emailErrMsg: '',
        passErrMsg: ''
    });
   
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const handleSignIn = async() => {
        if(inputValidation.isValidEmail && inputValidation.isValidPassword){
            setIsLoading(true)
            await signIn({email, password})
            setIsLoading(false)
        } 
    }

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
            setInputValidation({
                ...inputValidation,
                isValidEmail: true,
                emailErrMsg: ''
            });
            return true
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
        handleSignIn,
        handleValidEmail,
        handleValidPassword,
        setIsSignUp,
        setIsFocused,
        setPassword,
        setEmail
    };
  };
  
  export default method;