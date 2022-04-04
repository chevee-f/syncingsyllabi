import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const method = (setModalVisible) => {

    const { state } = useContext(AuthContext);
    const { user } = useSelector(state => state.userReducer);
    const { error } = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();
    const fetchUser = () => {
        let userId = state.userId
        let token = state.token
        dispatch(getUser(userId, token));
    }

    const [goals, setGoals] = React.useState([
        {
            goal: "Get an A for IS Exam!",
            dateTime: "Due Tomorrow at 10:00am",
            isDue: true
        },
        {
            goal: "Get an A for IS Exam!",
            dateTime: "10-29-2021  |  1:00 PM",
            isDue: false
        },
        {
            goal: "Get an A for IS Exam!",
            dateTime: "10-29-2021  |  1:00 PM",
            isDue: false
        }
    ]);

    useEffect(() => {
      if(state.token !== '' && state.userId !== '') fetchUser();
      }, [state]);
   

    return {
        goals
    };
  };
  
  export default method;