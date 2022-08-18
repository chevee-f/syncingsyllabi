import axios from 'axios';
import { getAPIBaseUrl } from "../config/env";
export const ADD_NOTIFICATION_TOKEN = 'ADD_NOTIFICATION_TOKEN';
export const GET_USER_NOTIFICATION = 'GET_USER_NOTIFICATION';

export const addNotificationToken = (userId, token, notificationToken) => {
    try {
        return async dispatch => {
            axios.post(`${getAPIBaseUrl()}notification/NotificationToken`,
            {
                "UserId": parseInt(userId),
                "NotificationToken": notificationToken
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                //dispatch({
                //    type: ADD_NOTIFICATION_TOKEN,
                //    payload: res.data.data.item
                //});
            })
        };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
};
  
export const getUserNotification = (userId, token) => {
    try {
        return async dispatch => {
            axios.post(`${getAPIBaseUrl()}notification/UserNotificationList`,
            {
                "UserId": parseInt(userId),
                "UserNotificationStatus": 0
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch({
                    type: GET_USER_NOTIFICATION,
                    payload: res.data.data.items
                });
            })
        };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
};

export const readUserNotification = (notificationId, userId, token) => {
    try {
        return async dispatch => {
            axios.post(`${getAPIBaseUrl()}notification/ReadNotification`,
            {
                "NotificationId": parseInt(notificationId)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getUserNotification(userId, token));
            })
        };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
};

export const removeUserNotification = (notificationId, userId, token) => {
    try {
        return async dispatch => {
            axios.post(`${getAPIBaseUrl()}notification/RemoveNotification`,
            {
                "NotificationId": parseInt(notificationId)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getUserNotification(userId, token));
            })
        };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
};