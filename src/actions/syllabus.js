import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';
import Moment from 'moment';

export const GET_SYLLABUS = 'GET_SYLLABUS';
export const ADD_SYLLABUS = 'ADD_SYLLABUS';


export const addSyllabus = (syllabus, userId, token, selectedColor) => {
    try {
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Syllabus/CreateSyllabus`,
            {
                "userId": parseInt(userId),
                "classCode": syllabus.className,
                "className": syllabus.className,
                "teacherName": syllabus.teacherName,
                "classSchedule": Moment(syllabus.schedule, 'MM-DD-YYYY hh:mm A'),
                "colorInHex": JSON.stringify(selectedColor)
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch({
                    type: ADD_SYLLABUS,
                    payload: res.data.data.item
                });
            })
      };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };