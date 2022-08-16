import React, { useState,useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import { addNotificationToken } from '../../actions/notification';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { Alert } from 'react-native';

const method = () => {

    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);

    const [cardData, setCardData] = useState([]);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
        const fcmToken = await messaging().getToken();
        handleFcmToken(fcmToken)
        console.log('Authorization status:', authStatus);
      }
  }

  const handleFcmToken = (fcmToken) => {
      if (fcmToken) {
        let userId = state.userId
        let token = state.token
        dispatch(addNotificationToken(userId, token, fcmToken));
       //console.log(fcmToken);
      } else {
       //console.log("Failed", "No token received");
      }
  }

  const createNotificationListeners = () => {
    messaging().onTokenRefresh(fcmToken => {
      handleFcmToken(fcmToken)
    });  
  }

  useEffect(() => {
      fetchUser();
      requestUserPermission();
      createNotificationListeners();
  }, [state]);

    const callme = (date) => {
        const d = new Date(date);
        let m = (d.getMonth()+1);
        if(m.toString().length === 1) {
          m = "0" + m;
        }
        let dt = d.getDate();
        if(dt.toString().length === 1) {
          dt = "0" + dt;
        }
        let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
        let hasData = false;
        for (let i = 0; i < markedDatesArray.length; i++) {
          if(selectedDateY === markedDatesArray[i].date && !hasData) {
            hasData = true;
            setCardData(markedDatesArray[i].data);
          }
        }

        if(!hasData) {
          setCardData([]);
        } 
        setSelectedDate(selectedDateY)
    }

    return {
        cardData,
        selectedDate,
        markedDatesArray,
        setCardData,
        setSelectedDate,
        setMarkedDatesArray,
        callme
    };
  };
  
  export default method;