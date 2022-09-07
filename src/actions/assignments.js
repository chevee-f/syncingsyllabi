import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';
import Moment from 'moment';

export const GET_ASSIGNMENTS_BY_USER = 'GET_ASSIGNMENTS_BY_USER';
export const ADD_ASSIGNMENTS = 'ADD_ASSIGNMENTS';
    export const addAssignments = (assignment, userId, token, date) => {
        console.log("adding this->>>>>>>>>>>>>>>>>>>>>")
        console.log(assignment)
        console.log(date)
        try {
            return async dispatch => {
                const formData = new FormData();
                formData.append('SyllabusId', assignment.syllabusId);
                formData.append('UserId', parseInt(userId));
                formData.append('AssignmentTitle', assignment.title);
                formData.append('Notes', assignment.notes);
                formData.append('AssignmentDateEnd', date);
                formData.append('ColorInHex', '');
                if(String(assignment.attachments) == "")
                    assignment.attachments = null;
                if(assignment.attachments != null)
                    formData.append('AttachmentFile', assignment.attachments);
                let res = await fetch(`${getAPIBaseUrl()}Assignment/CreateAssignment`,{
                    method: 'post',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      "Authorization" : `Bearer ${token}`
                    },
                    body: formData
                });

                let responseJson = await res.json();
                console.log("responseJson")
                console.log(responseJson)
                dispatch(getAssignmentsByUser(userId, token));
                dispatch({
                    type: ADD_ASSIGNMENTS,
                    payload: responseJson.data
                });
            };
        } catch (error) {
            Alert.alert(error.message)
            dispatch({ type: 'HAS_ERROR', payload: error.message });
        }
  };

  export const updateAssignment = (assignment, userId, token, date) => {
        try {
            console.log("Updateing disVvvvvvvvvvvvvvvvvvvvvv")
            console.log(assignment)
            if(String(assignment.attachments) == "")
                assignment.attachments = null;
            return async dispatch => {
                const formData = new FormData();
                formData.append('AssignmentId', assignment.id);
                formData.append('SyllabusId', assignment.syllabusId);
                formData.append('UserId', parseInt(userId));
                formData.append('AssignmentTitle', assignment.title);
                formData.append('Notes', assignment.notes);
                formData.append('AssignmentDateEnd', date);
                if(assignment.attachments != null) {
                    formData.append('AttachmentFile', assignment.attachments);
                }
                let res = await fetch(`${getAPIBaseUrl()}Assignment/UpdateAssignment`,{
                    method: 'post',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      "Authorization" : `Bearer ${token}`
                    },
                    body: formData
                });

                let responseJson = await res.json();
                // console.log(responseJson)
                dispatch(getAssignmentsByUser(userId, token));
                dispatch({
                    type: ADD_ASSIGNMENTS,
                    payload: responseJson.data
                });
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
                console.log("CALLING delete assignments")
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
                const formData = new FormData();
                formData.append('AssignmentId', assignment.id);
                formData.append('UserId', parseInt(userId));
                formData.append('isCompleted', true);

                let res = await fetch(`${getAPIBaseUrl()}Assignment/UpdateAssignment`,{
                    method: 'post',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      "Authorization" : `Bearer ${token}`
                    },
                    body: formData
                });

                let responseJson = await res.json();
                // console.log(responseJson)
                dispatch(getAssignmentsByUser(userId, token));
                dispatch({
                    type: ADD_ASSIGNMENTS,
                    payload: responseJson.data
                });

                // axios.post(`${getAPIBaseUrl()}Assignment/UpdateAssignment`,
                //     {
                //         "assignmentId": assignment.id,
                //         "userId": parseInt(userId),
                //         "isCompleted": true
                //     },
                // { headers: {"Authorization" : `Bearer ${token}`} })
                // .then((res) => {
                //     dispatch({ type: 'CLEAR_ERROR', payload: [] });
                //     console.log("CALLING complete assignments")
                //     dispatch(getAssignmentsByUser(userId, token));
                // })
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
            pad(date.getUTCSeconds());
            b = date.split("T")[0];

            date = new Date("2070");
            date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + 'T' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
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
                .then(async(res) => {
                    // console.log(res.data.data.items)
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