import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (navigation) => {

    const errors = useSelector((state) => state.errors);
    const {state, changePassword, signOut} = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);


    useEffect(() => {
        if(state.isSuccessChangePassword) setModalVisible(true)

    }, [state]); 

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [secureCurrentPassword, setSecureCurrentPassword] = React.useState(true);
    const [secureNewPassword, setSecureNewPassword] = React.useState(true);
    const [secureConfirmNewPassword, setSecureConfirmNewPassword] = React.useState(true);

    const [inputValidation, setInputValidation] = React.useState({
        isValidCurrentPassword: true,
        isValidNewPassword: true,
        isValidConfirmNewPassword: true,
        currentPasswordErrMsg: '',
        newPasswordErrMsg: '',
        confirmNewPasswordErrMsg: ''
    });

    const handleChangePassword = () => {
        if(inputValidation.isValidCurrentPassword && inputValidation.isValidNewPassword && inputValidation.isValidConfirmNewPassword){
            setIsLoading(true)
            let updatedPassword = confirmNewPassword
            let userId = state.userId
            changePassword({userId, currentPassword, updatedPassword}) 
            setIsLoading(false)
        }
    }

    const closeModal = () => {
        setModalVisible(false)
        signOut()
    }

    const updateSecureCurrentPassword = () => {
        setSecureCurrentPassword(!secureCurrentPassword)
    }

    const updateSecureNewPassword = () => {
        setSecureNewPassword(!secureNewPassword)
    }

    const updateSecureConfirmNewPassword = () => {
        setSecureConfirmNewPassword(!secureConfirmNewPassword)
    }

    const handleValidPassword = (e, val) => {
        if(val === 'currentPassword'){
            if(e === ''){
                setInputValidation({
                    ...inputValidation,
                    isValidCurrentPassword: false,
                    currentPasswordErrMsg: 'Current Password field could not be empty'
                });
                return false
            }else if(e !== state.currentPassword){
                setInputValidation({
                    ...inputValidation,
                    isValidCurrentPassword: false,
                    currentPasswordErrMsg: 'Incorrect current password'
                });
                return false
            }else if(e.trim().length < 8){
                setInputValidation({
                    ...inputValidation,
                    isValidCurrentPassword: false,
                    currentPasswordErrMsg: 'Please enter at least 8 characters'
                });
                return false
            }else{
                setInputValidation({
                    ...inputValidation,
                    isValidCurrentPassword: true,
                    currentPasswordErrMsg: ''
                });
                return true
            }
        }
        else if(val === 'newPassword'){
            if(e === ''){
                setInputValidation({
                    ...inputValidation,
                    isValidNewPassword: false,
                    newPasswordErrMsg: 'New Password field could not be empty'
                });
                return false
            }else if(e.trim().length < 8){
                setInputValidation({
                    ...inputValidation,
                    isValidNewPassword: false,
                    newPasswordErrMsg: 'Please enter at least 8 characters'
                });
                return false
            }else{
                setInputValidation({
                    ...inputValidation,
                    isValidNewPassword: true,
                    newPasswordErrMsg: ''
                });
                return true
            }
        }
        else if(val === 'confirmNewPassword'){
            if(e === ''){
                setInputValidation({
                    ...inputValidation,
                    isValidConfirmNewPassword: false,
                    confirmNewPasswordErrMsg: 'Confirm New Password field could not be empty'
                });
                return false
            }else if(e.trim().length < 8){
                setInputValidation({
                    ...inputValidation,
                    isValidConfirmNewPassword: false,
                    confirmNewPasswordErrMsg: 'Please enter at least 8 characters'
                });
                return false
            }else if(newPassword !== confirmNewPassword){
                setInputValidation({
                    ...inputValidation,
                    isValidConfirmNewPassword: false,
                    confirmNewPasswordErrMsg: 'Passwords does not match'
                });
                return false
            }else{
                setInputValidation({
                    ...inputValidation,
                    isValidConfirmNewPassword: true,
                    confirmNewPasswordErrMsg: ''
                });
                return true
            }
        }
    }

    return {
        currentPassword,
        newPassword,
        confirmNewPassword,
        isLoading,
        modalVisible,
        secureCurrentPassword,
        secureNewPassword,
        secureConfirmNewPassword,
        inputValidation,
        setModalVisible,
        setCurrentPassword,
        setNewPassword,
        setConfirmNewPassword,
        updateSecureCurrentPassword,
        updateSecureNewPassword,
        updateSecureConfirmNewPassword,
        handleChangePassword,
        handleValidPassword,
        closeModal
    };
  };
  
  export default method;