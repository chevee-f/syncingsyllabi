import React, { useState,useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (navigation) => {

    const errors = useSelector((state) => state.errors);
    const {state, sendVerificationCode} = useContext(AuthContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
     
    useEffect(() => {
       
    }, [errors]); 

    const handleSearchAccount = async() => {
        setIsLoading(true)
        let codeType = 2
        await sendVerificationCode({emailAddress, codeType}) 
        setIsLoading(false)
    }

    return {
        emailAddress,
        isLoading,
        setEmailAddress,
        handleSearchAccount
    };
  };
  
  export default method;