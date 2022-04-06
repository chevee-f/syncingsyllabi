import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';

export const GET_SYLLABUS_BY_USER = 'GET_SYLLABUS_BY_USER';
export const ADD_SYLLABUS = 'ADD_SYLLABUS';
export const GET_SYLLABUS_DETAIL= 'GET_SYLLABUS_DETAIL';

  export const addSyllabus = (syllabus, userId, token, selectedColor) => {
    try {
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Syllabus/CreateSyllabus`,
            {
                "userId": parseInt(userId),
                "classCode": syllabus.className,
                "className": syllabus.className,
                "teacherName": syllabus.teacherName,
                "classSchedule": syllabus.schedule,
                "colorInHex": JSON.stringify(selectedColor)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getSyllabusByUser(userId, token));
            })
      };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };

  export const updateSyllabus = (syllabus, userId, token, selectedColor) => {
    try {
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Syllabus/UpdateSyllabus`,
            {
                "syllabusId": syllabus.id,
                "userId": parseInt(userId),
                "classCode": syllabus.className,
                "className": syllabus.className,
                "teacherName": syllabus.teacherName,
                "classSchedule": syllabus.schedule,
                "colorInHex": JSON.stringify(selectedColor)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getSyllabusByUser(userId, token));
                //dispatch({
                //    type: ADD_SYLLABUS,
                //    payload: res.data.data.item
                //});
            })
      };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };

  export const getSyllabusByUser = (userId, token) => {
    try {
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Syllabus/GetSyllabusDetailsList`,
            {
                "UserId": parseInt(userId)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch({
                    type: GET_SYLLABUS_BY_USER,
                    payload: res.data.data.items
                });
            })
      };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };

  export const getSyllabusDetail = (syllabusId, userId, token) => {
    try {
      return async dispatch => {
        const res = await axios.get(`${getAPIBaseUrl()}Syllabus/GetSyllabusDetails/${syllabusId}/${userId}`,
        { headers: {"Authorization" : `Bearer ${token}`} })
          dispatch({
            type: GET_SYLLABUS_DETAIL,
            payload: res.data.data.item,
          });
      };
    } catch (error) {
      Alert.alert(JSON.stringify(error.message))
    }
  };

  export const removeSyllabus = (syllabusId, userId, token) => {
    try {
      return async dispatch => {
        const res = await axios.get(`${getAPIBaseUrl()}Syllabus/DeleteSyllabus/${syllabusId}/${userId}`,
        { headers: {"Authorization" : `Bearer ${token}`} })
          dispatch({ type: 'CLEAR_ERROR', payload: [] });
          dispatch(getSyllabusByUser(userId, token));
      };
    } catch (error) {
      Alert.alert(JSON.stringify(error.message))
    }
  };
  
