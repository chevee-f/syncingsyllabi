import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { addSyllabus } from '../../../actions/syllabus';
import AsyncStorage from '@react-native-community/async-storage';

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if(error.length !== 0) Alert.alert("Error", error);
    }, [syllabus, error]);

    const [classSyllabus, setClassSyllabus] = useState({
        className: '',
        teacherName: '',
        schedule: '',
        scheduleTime: new Date(),
    });
    const [selectedColor, setSelectedColor] = useState(0);
    const [bgColor, setBgColor] = React.useState(
        [
            ['#FF9966', '#FF5E62'],
            ['#56CCF2', '#2F80ED'],
            ['#4776E6', '#8E54E9'],
            ['#00B09B', '#96C93D'],
            ['#A8C0FF', '#3F2B96'],
            ['#ED213A', '#93291E'],
            ['#FDC830', '#F37335'],
            ['#00B4DB', '#0083B0'],
            ['#AD5389', '#3C1053'],
            ['#EC008C', '#FC6767'],
            ['#DA4453', '#89216B'],
            ['#654EA3', '#EAAFC8']
        ]
      );

    const handleAddSyllabus = async() => {
        let userId = state.userId
        let token = await AsyncStorage.getItem('userToken')
        await dispatch(addSyllabus(classSyllabus, userId, token, selectedColor))
    }

      
    return {
        bgColor,
        selectedColor,
        classSyllabus,
        setClassSyllabus,
        setSelectedColor,
        handleAddSyllabus
    };
  };
  
  export default method;