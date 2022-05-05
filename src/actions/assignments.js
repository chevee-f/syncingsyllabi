import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';
import Moment from 'moment';

export const GET_ASSIGNMENTS_BY_USER = 'GET_ASSIGNMENTS_BY_USER';
export const ADD_ASSIGNMENTS = 'ADD_ASSIGNMENTS';
    export const addAssignments = (assignment, userId, token, date) => {
        try {
            return async dispatch => {
            axios.post(`${getAPIBaseUrl()}Assignment/CreateAssignment`,
                {
                    "pagination": {
                        "includeTotal": true,
                        "skip": 0,
                        "take": 0
                    },
                    "sort": [
                        {
                            "fieldCode": 1,
                            "direction": "asc"
                        }
                    ],
                    "dateRange": {
                        "startDate": "2022-01-01T02:31:43.387Z",
                        "endDate": "2022-12-12T02:31:43.387Z"
                    },
                    "userId": parseInt(userId),
                    "syllabusId": 0,
                    "assignmentTitle": assignment.title,
                    "notes": assignment.notes,
                    "assignmentDateStart": date,
                    "assignmentDateEnd": date,
                    "colorInHex": "",
                    "isCompleted": false,
                    "isActive": true
                },
                { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res) => {
                    console.log(res);
                    dispatch({ type: 'CLEAR_ERROR', payload: [] });
                    dispatch(getAssignmentsByUser(userId, token));
                    dispatch({
                       type: ADD_ASSIGNMENTS,
                       payload: res.data.data.item
                    });
                })
            };
        } catch (error) {
            Alert.alert(error.message)
            dispatch({ type: 'HAS_ERROR', payload: error.message });
        }
  };

  export const updateAssignment = (assignment, userId, token, date) => {
        try {
            return async dispatch => {
            axios.post(`${getAPIBaseUrl()}Assignment/UpdateAssignment`,
                {
                    "assignmentId": assignment.id,
                    "userId": parseInt(userId),
                    "assignmentTitle": assignment.title,
                    "notes": assignment.notes,
                    "assignmentDateStart": date,
                    "assignmentDateEnd": date,
                },
                { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res) => {
                    dispatch({ type: 'CLEAR_ERROR', payload: [] });
                    dispatch(getAssignmentsByUser(userId, token));
                })
            };
        } catch (error) {
            Alert.alert(error.message)
            dispatch({ type: 'HAS_ERROR', payload: error.message });
        }
  };

  export const deleteAssignment = (removeId, userId, token) => {
        try {
            return async dispatch => {
                const res = await axios.get(`${getAPIBaseUrl()}Assignment/DeleteAssignment/${removeId}/${userId}`,
                { headers: {"Authorization" : `Bearer ${token}`} })
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getAssignmentsByUser(userId, token));
            };
        } catch (error) {
            Alert.alert(error.message)
            dispatch({ type: 'HAS_ERROR', payload: error.message });
        }
  };

  export const completeAssignment = (assignment, userId, token) => {
        try {
            return async dispatch => {
                axios.post(`${getAPIBaseUrl()}Assignment/UpdateAssignment`,
                    {
                        "assignmentId": assignment.id,
                        "userId": parseInt(userId),
                        "isCompleted": true
                    },
                { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res) => {
                    dispatch({ type: 'CLEAR_ERROR', payload: [] });
                    dispatch(getAssignmentsByUser(userId, token));
                })
            };
        } catch (error) {
            Alert.alert(error.message)
            dispatch({ type: 'HAS_ERROR', payload: error.message });
        }
  };

  export const getAssignmentsByUser = (userId, token, sort = '', showAll = false) => {
    try {
        var d = new Date();
        d.setMonth(d.getMonth() + 3);
        var b = new Date();
        b.setMonth(b.getMonth() - 3);
        sortValue = 7;
        console.log("get all asgn = " + sort);
        if(sort == 'class') {
            sortValue = 2;
        }
        if(sort == 'duedate') {
            sortValue = 7;
        }
        if(sort == 'title') {
            sortValue = 9;
        }

        if(showAll) {
            b = new Date("2020");
            d = new Date("2070");
            
            let pad = function(num) { return ('00'+num).slice(-2) };
            let date = new Date("2020");
            date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + 'T' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds())    + 'Z';
            b = date.split("T")[0];

            date = new Date("2070");
            date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + 'T' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds())    + 'Z';
            d = date.split("T")[0];
        }
        return async dispatch => {
            axios.post(`${getAPIBaseUrl()}Assignment/GetAssignmentDetailsList`,
                {
                    "UserId": parseInt(userId),
                    "IsCompleted": false,
                    "Pagination":
                    {
                        "IncludeTotal": true,
                        "Skip": 0,
                        "Take": 0
                    },
                    "Sort": 
                    [
                        {
                            "FieldCode": sortValue,
                            "Direction": "asc"
                        }
                    ],
                    "DateRange":
                    {
                        "StartDate": b,
                        "EndDate": d
                    }
                },
                { headers: {"Authorization" : `Bearer ${token}`} })
                .then((res) => {
                    console.log("asd")
                    console.log(res.data.data.items)
                    dispatch({ type: 'CLEAR_ERROR', payload: [] });
                    dispatch({
                        type: GET_ASSIGNMENTS_BY_USER,
                        payload: res.data.data.items
                    });
                })
        };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
  };