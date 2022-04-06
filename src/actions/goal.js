import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';
import Moment from 'moment';

export const GET_GOAL_BY_USER = 'GET_GOAL_BY_USER';
export const ADD_GOAL = 'ADD_GOAL';
export const GET_GOAL_DETAIL= 'GET_GOAL_DETAIL';

export const addGoal = (goal, userId, token) => {
    try {
      return async dispatch => {
        axios.post(`${getAPIBaseUrl()}Goal/CreateGoal`,
            {
                "userId": parseInt(userId),
                "goalTitle": '',
                "goalType": goal.type,
                "goalDescription": goal.description,
                "goalDateStart": Moment(goal.startDate, 'MM-DD-YYYY HH:mm'),
                "goalDateEnd": Moment(goal.endDate, 'MM-DD-YYYY HH:mm')
            },
            { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                dispatch({ type: 'CLEAR_ERROR', payload: [] });
                dispatch(getGoalByUser(userId, token));
            })
      };
    } catch (error) {
        Alert.alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
    }
};

export const updateGoal = (goal, userId, token) => {
  try {
    return async dispatch => {
      axios.post(`${getAPIBaseUrl()}Goal/UpdateGoal`,
          {
              "goalId": goal.id,
              "userId": parseInt(userId),
              "goalTitle": '',
              "goalType": goal.type,
              "goalDescription": goal.description,
              "goalDateStart": Moment(goal.startDate, 'MM-DD-YYYY HH:mm'),
              "goalDateEnd": Moment(goal.endDate, 'MM-DD-YYYY HH:mm'),
              "isCompleted": goal.isCompleted,
              "isArchived": goal.isArchived
          },
          { headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
              dispatch({ type: 'CLEAR_ERROR', payload: [] });
              dispatch(getGoalByUser(userId, token));
          })
    };
  } catch (error) {
      Alert.alert(error.message)
      dispatch({ type: 'HAS_ERROR', payload: error.message });
  }
};

export const getGoalByUser = (userId, token) => {
  try {
    return async dispatch => {
      axios.post(`${getAPIBaseUrl()}Goal/GetGoalDetailsList`,
          {
              "UserId": parseInt(userId)
          },
          { headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
              dispatch({ type: 'CLEAR_ERROR', payload: [] });
              dispatch({
                  type: GET_GOAL_BY_USER,
                  payload: res.data.data.items
              });
          })
    };
  } catch (error) {
      Alert.alert(error.message)
      dispatch({ type: 'HAS_ERROR', payload: error.message });
  }
};

export const removeGoal = (goalId, userId, token) => {
  try {
    return async dispatch => {
      const res = await axios.get(`${getAPIBaseUrl()}Goal/DeleteGoal/${goalId}/${userId}`,
      { headers: {"Authorization" : `Bearer ${token}`} })
        dispatch({ type: 'CLEAR_ERROR', payload: [] });
        dispatch(getGoalByUser(userId, token));
    };
  } catch (error) {
    Alert.alert(JSON.stringify(error.message))
  }
};
