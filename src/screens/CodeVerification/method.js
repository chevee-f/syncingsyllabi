import React, { useState,useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { Alert } from 'react-native';

const method = (navigation) => {

    const errors = useSelector((state) => state.errors);
    const {state, verifyUserCode, sendVerificationCode} = useContext(AuthContext);
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
     
    useEffect(() => {
        if(state.isEmailVerified) state.codeType === 1 ? navigation.navigate('SignUpConfirmationScreen') : navigation.navigate('ChangePasswordScreen')
        if(!state.isEmailVerified && state.isEmailVerified !== undefined) Alert.alert('Invalid verification code')
    }, [state.isEmailVerified,state.codeType,errors]); 

    const handleCodeVerification = async() => {
        if(verificationCode === ''){
            Alert.alert('Invalid verification code')
        }else{
            setIsLoading(true)
            let userId = state.userId
            let codeType = state.codeType
            let email = state.email
            await verifyUserCode({userId, verificationCode, codeType, email}) 
            setIsLoading(false)
        }
    }

    const handleResendCode = async() => {
        let codeType = state.codeType
        let emailAddress = state.email
        await sendVerificationCode({emailAddress, codeType}) 
    }

    return {
        isLoading,
        verificationCode,
        setVerificationCode,
        handleCodeVerification,
        handleResendCode
    };
  };
  
  export default method;