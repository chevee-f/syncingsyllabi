import React, { useState,useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { Alert } from 'react-native';

const method = (navigation) => {

    const errors = useSelector((state) => state.errors);
    const {state, verifyUserCode} = useContext(AuthContext);
    const [verificationCode, setVerificationCode] = useState('');
     
    useEffect(() => {
        if(state.isEmailVerified) navigation.navigate('SignUpConfirmationScreen')
        if(!state.isEmailVerified && state.isEmailVerified !== undefined) Alert.alert('Invalid verification code')
    }, [state.isEmailVerified,errors]); 

    const handleCodeVerification = () => {
        let userId = state.userId
        let email = state.email
        verifyUserCode({userId, verificationCode, email}) 
    }

    return {
        verificationCode,
        setVerificationCode,
        handleCodeVerification
    };
  };
  
  export default method;