import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../actions/user';
import {Context as AuthContext} from '../../../components/Context/AuthContext';

const method = (setModalVisible) => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if(user.length !== 0){
            setProfile({ firstName: user.firstName,
                         lastName: user.lastName,
                         email: user.email,
                         school: user.school,
                         dateOfBirth: user.dateOfBirth,
                         major: user.major
                       })
        }

        if(error.length !== 0) setHasError(true)
       
    }, [user, error]);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        dateOfBirth: '',
        major: ''
    });

    const [inputValidation, setInputValidation] = useState({
        isValidEmail: true,
        emailErrMsg: ''
    });

    const handleUpdateProfile = async() => {
        setIsLoading(true)
        let userId = state.userId
        let token = state.token
        await dispatch(updateUser(profile, userId, token))
        if(hasError){
            Alert.alert("Error", error,
                [{ text: "OK", onPress: () => setIsLoading(false)}],
                { cancelable: false }
            );
        }else{
            Alert.alert(
                "Profile",
                "Your profile has been updated.",
                [{ text: "OK", onPress: () =>  {setIsLoading(false)
                                                setModalVisible(false)}}],
                { cancelable: false }
            );
        }
      
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const handleValidEmail = (e) => {
        if(e.trim().length === 0) {
            setInputValidation({
                ...inputValidation,
                isValidEmail: false,
                emailErrMsg: 'Email field cannot be empty'
            });
            return false
        }else if(!validateEmail(e)){
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

    return {
        profile,
        isLoading,
        inputValidation,
        selectedDate,
        setSelectedDate,
        setProfile,
        handleUpdateProfile,
        handleValidEmail
    };
  };
  
  export default method;