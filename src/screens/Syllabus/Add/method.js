import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { addSyllabus, updateSyllabus, removeSyllabus } from '../../../actions/syllabus';
import Moment from 'moment';

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if(isSubmitted){
            if(error.length !== 0){
                Alert.alert(error);
            }else{
                resetClassSyllabus()
                setSuccessMessage('Your class has been added!')
                setTimeout(function(){setSuccessModalVisible(true)}, 1000)
            }
        }
    }, [isSubmitted, syllabus.length, error.length]);

    const [classSyllabus, setClassSyllabus] = useState({
        id: '',
        className: '',
        classCode: '',
        teacherName: '',
        schedule: '',
        scheduleStartTime: new Date(),
        scheduleEndTime: new Date(),
        scheduleList: [],
        colorInHex: 0
    });

    const [inputValidation, setInputValidation] = useState({
        isValidClassName: true,
        isValidTeacherName: true,
        isValidSchedule: true,
        classNameErrMsg: '',
        teacherNameErrMsg: '',
        scheduleErrMsg: ''
    });

    const days = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];
    const [action, setAction] = useState('')
    const [confirmationVisible, setConfirmationVisible] = useState('')
    const [weekday, setWeekday] = useState([-1])
    const [hasValue, setHasValue] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [bgColor, setBgColor] = useState(
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

    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);

    const handleAddSyllabus = async() => {
        let userId = state.userId
        let token = state.token
        let isValidSchedule = await handleValidSchedule(classSyllabus.schedule)
        if(isValidSchedule){
            await dispatch(addSyllabus(classSyllabus, userId, token))
            setTimeout(function(){setIsSubmitted(true)}, 1000)
        } 
    }

    const handleUpdateSyllabus = async() => {
        let userId = state.userId
        let token = state.token
        let isValidSchedule = await handleValidSchedule(classSyllabus.schedule)
        if(isValidSchedule){
            await dispatch(updateSyllabus(classSyllabus, userId, token))
            if(hasError){
                Alert.alert("Error", error);
            }else{
                resetClassSyllabus()
            }
        } 
    }

    const handleRemoveSyllabus = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(removeSyllabus(classSyllabus.id, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            resetClassSyllabus()
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
                            scheduleList: [],
                            colorInHex: 0
                        })
        setWeekday([-1])
        setHasValue(false)
    }

    const addSchedule = () => {
        if(weekday.length === 1){
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

            
            weekday.map(
                function(data){
                    if(data !== -1){
                        dataArray.push({schedule: `${days[data - 1]} ${startTime}-${endTime}`,
                                        dayNo: weekday,
                                        startTime: classSyllabus.scheduleStartTime,
                                        endTime: classSyllabus.scheduleEndTime
                                      });
                    }
                }
            )
            
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

    const onConfirm = () => {
        setConfirmationVisible(!confirmationVisible)
        if(action === 'Add'){
            handleAddSyllabus()
        }else if(action === 'Update'){
            handleUpdateSyllabus()
        }else{
            handleRemoveSyllabus()
        }
        setHasValue(false)
    }
    
    const handleSaveSyllabi = () => {
        let userId = state.userId;
        if(userId) {
            setAction('Add')
            setConfirmationMessage('Add this Syllabi?')
            setConfirmationVisible(true)
        } else {
            setNotAvailableModalVisible(true)
        }
    }
    return {
        bgColor,
        classSyllabus,
        weekday,
        inputValidation,
        hasValue,
        confirmationMessage,
        confirmationVisible,
        successMessage,
        successModalVisible,
        notAvailableModalVisible,
        setNotAvailableModalVisible,
        setSuccessModalVisible,
        setConfirmationVisible,
        setAction,
        setHasValue,
        setConfirmationMessage,
        setWeekday,
        setClassSyllabus,
        addSchedule,
        handleCallback,
        handleValidClassName,
        handleValidTeacherName,
        resetClassSyllabus,
        onConfirm,
        handleSaveSyllabi
    };
  };
  
  export default method;