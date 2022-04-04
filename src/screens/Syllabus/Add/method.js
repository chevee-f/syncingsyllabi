import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { addSyllabus, updateSyllabus } from '../../../actions/syllabus';
import Moment from 'moment';

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if(error.length !== 0) setHasError(true)
    }, [syllabus, error]);

    const [classSyllabus, setClassSyllabus] = useState({
        id: '',
        className: '',
        teacherName: '',
        schedule: '',
        scheduleStartTime: new Date(),
        scheduleEndTime: new Date(),
        scheduleList: []
    });

    const [inputValidation, setInputValidation] = React.useState({
        isValidClassName: true,
        isValidTeacherName: true,
        isValidSchedule: true,
        classNameErrMsg: '',
        teacherNameErrMsg: '',
        scheduleErrMsg: ''
    });

    const days = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];
    const [weekday, setWeekday] = React.useState(-1)
    const [selectedColor, setSelectedColor] = useState(0);
    const [hasValue, setHasValue] = useState(false);
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
        let token = state.token
        let isValidSchedule = await handleValidSchedule(classSyllabus.schedule)
        if(isValidSchedule){
            await dispatch(addSyllabus(classSyllabus, userId, token, selectedColor))
            if(hasError){
                Alert.alert("Error", error);
            }else{
                resetClassSyllabus()
            }
        } 
    }

    const handleUpdateSyllabus = async() => {
        let userId = state.userId
        let token = state.token
        let isValidSchedule = await handleValidSchedule(classSyllabus.schedule)
        if(isValidSchedule){
            await dispatch(updateSyllabus(classSyllabus, userId, token, selectedColor))
            if(hasError){
                Alert.alert("Error", error);
            }else{
                resetClassSyllabus()
            }
        } 
    }

    const resetClassSyllabus = () => {
        setClassSyllabus({...classSyllabus,        
                            id: null, 
                            className: '',
                            teacherName: '',
                            schedule: '',
                            scheduleStartTime: new Date(),
                            scheduleEndTime: new Date(),
                            scheduleList: []})
        setWeekday(-1)
        setSelectedColor(0)
    }

    const addSchedule = () => {
        if(weekday === -1){
            Alert.alert('Please select day')
        }else{
            let dataArray = classSyllabus.scheduleList;  

            let startTimeHour = Moment(classSyllabus.scheduleStartTime).format("h")
            let startTimeMinute = Moment(classSyllabus.scheduleStartTime).format("m")
            let startTimeDesc = Moment(classSyllabus.scheduleStartTime).format("a")
            let startTime = startTimeMinute > 0 ? `${startTimeHour}:${startTimeMinute}${startTimeDesc}`:
                            `${startTimeHour}${startTimeDesc}`

            let endTimeHour = Moment(classSyllabus.scheduleEndTime).format("h")
            let endTimeMinute = Moment(classSyllabus.scheduleEndTime).format("m")
            let endTimeDesc = Moment(classSyllabus.scheduleEndTime).format("a")
            let endTime = endTimeMinute > 0 ? `${endTimeHour}:${endTimeMinute}${endTimeDesc}`:
                            `${endTimeHour}${endTimeDesc}`

            dataArray.push({schedule: `${days[weekday - 1]} ${startTime}-${endTime}`,
                            dayNo: weekday,
                            startTime: classSyllabus.scheduleStartTime,
                            endTime: classSyllabus.scheduleEndTime
                          });
            setClassSyllabus({...classSyllabus, scheduleList: dataArray})
            let schedules = (dataArray.map(
                            function(data){
                                return data.schedule;
                            }).join("|"));
            setClassSyllabus({...classSyllabus, schedule: schedules})
        }
    }

    const handleCallback = (index) => {
        let dataArray = classSyllabus.scheduleList;  
        dataArray.splice(index, 1);
        setClassSyllabus({...classSyllabus, scheduleList: dataArray}) 

        let schedules = (dataArray.map(
                        function(data){
                            return data.schedule;
                        }).join("|"));
        setClassSyllabus({...classSyllabus, schedule: schedules})
    }

    const handleValidClassName = (e) => {
        if(e.trim().length === 0) {
            setInputValidation({
                ...inputValidation,
                isValidClassName: false,
                classNameErrMsg: 'Class Name field cannot be empty'
            });
            return false
        }else {
            setInputValidation({
                ...inputValidation,
                isValidClassName: true,
                classNameErrMsg: ''
            });
            return true
        }
    }

    const handleValidTeacherName = (e) => {
        if(e.trim().length === 0) {
            setInputValidation({
                ...inputValidation,
                isValidTeacherName: false,
                teacherNameErrMsg: 'Teacher Name field cannot be empty'
            });
            return false
        }else {
            setInputValidation({
                ...inputValidation,
                isValidTeacherName: true,
                teacherNameErrMsg: ''
            });
            return true
        }
    }

    const handleValidSchedule = (e) => {
        if(e.trim().length === 0) {
            setInputValidation({
                ...inputValidation,
                isValidSchedule: false,
                scheduleErrMsg: 'Schedule field cannot be empty'
            });
            return false
        }else {
            setInputValidation({
                ...inputValidation,
                isValidSchedule: true,
                scheduleErrMsg: ''
            });
            return true
        }
    }
      
    return {
        bgColor,
        selectedColor,
        classSyllabus,
        weekday,
        inputValidation,
        hasValue,
        setHasValue,
        setWeekday,
        setClassSyllabus,
        setSelectedColor,
        handleAddSyllabus,
        handleUpdateSyllabus,
        addSchedule,
        handleCallback,
        handleValidClassName,
        handleValidTeacherName,
        resetClassSyllabus
    };
  };
  
  export default method;