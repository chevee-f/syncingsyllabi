import React, { useState,useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = () => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();
    const fetchUser = () => {
        let userId = state.userId
        let token = state.token
        dispatch(getUser(userId, token));
    }

    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        getFcmToken()
        console.log('Authorization status:', authStatus);
      }
  }

  const getFcmToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
       console.log(fcmToken);
       console.log("Your Firebase Token is:", fcmToken);
      } else {
       console.log("Failed", "No token received");
      }
  }

    useEffect(() => {
        fetchUser();
        requestUserPermission();
        /**
         * Uncomment this to listen to notifications in the foreground
        
         const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
         });
         return unsubscribe;
         */
    }, [state]);
   

    return {
    };
  };
  
  export default method;