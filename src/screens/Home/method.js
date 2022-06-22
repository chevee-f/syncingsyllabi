import React, { useState,useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = () => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);

    const [cardData, setCardData] = React.useState([]);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

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