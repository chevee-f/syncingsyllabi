import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (setModalVisible) => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();
    const fetchUser = () => {
        let userId = state.userId
        let token = state.token
        dispatch(getUser(userId, token));
    }

    useEffect(() => {
        fetchUser();
    }, [state]);
   

    return {
    };
  };
  
  export default method;