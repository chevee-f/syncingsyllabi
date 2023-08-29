import axios from 'axios';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';

export const GET_SYLLABUS_BY_USER = 'GET_SYLLABUS_BY_USER';
export const ADD_SYLLABUS = 'ADD_SYLLABUS';
export const GET_SYLLABUS_DETAIL= 'GET_SYLLABUS_DETAIL';

  export const addSyllabus = (syllabus, userId, token, classCodes=[]) => {
    try {
      console.log("adding syllabus")
      console.log(syllabus)
      let randCheck = true;
      let classCode = 0;
      while(randCheck) {
        classCode = Math.floor(Math.random() * 1000);
        randCheck = classCodes.includes(classCode);
        if(!randCheck)
          randCheck = false;
      }
      return async dispatch => {
        // let classCode = syllabus.classCode.replace(/[ )(]/g,'');
        let className = syllabus.className.replace(/[ )(]/g,'');
        console.log({
          "userId": parseInt(userId),
          "classCode": JSON.stringify(classCode),
          "className": className,
          "teacherName": syllabus.teacherName,
          "classSchedule": syllabus.schedule,
          "colorInHex": JSON.stringify(syllabus.colorInHex)
        })
        axios.post(`${getAPIBaseUrl()}Syllabus/CreateSyllabus`,
        {
          "userId": parseInt(userId),
          "classCode": JSON.stringify(classCode),
          "className": className,
          "teacherName": syllabus.teacherName,
          "classSchedule": syllabus.schedule,
          "colorInHex": JSON.stringify(syllabus.colorInHex)
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
          if(res.data.data.success){
            dispatch({ type: 'CLEAR_ERROR', payload: [] });
            dispatch(getSyllabusByUser(userId, token));
          }else{
            dispatch({ type: 'HAS_ERROR', payload: 'Class name must be unique' });
          }
        })
      };
    } catch (error) {
      console.log(error.message)
      Alert.alert(error.message)
      dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };

  export const updateSyllabus = (syllabus, userId, token) => {
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
                "colorInHex": JSON.stringify(syllabus.colorInHex)
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

    console.log("READING SYLLABUS ITEMS")
    try {
      if(userId == null)
        userId = 0;
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Syllabus/GetSyllabusDetailsList`,
        {
            "UserId": parseInt(userId)
        },
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log("SYLLABUS ITEMS")
            console.log(res.data.data.items)
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
  
