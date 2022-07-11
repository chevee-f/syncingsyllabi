import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { addSyllabus, updateSyllabus } from '../../../actions/syllabus';
import { Alert } from 'react-native';

const method = (setClassSyllabi,classSyllabi) => {
    const dispatch = useDispatch();
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const [hasError, setHasError] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState(false);

    const [otherSchedule, setOtherSchedule] = useState('');
    const [isOtherScheduleSelected, setIsOtherScheduleSelected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [confirmationVisible, setConfirmationVisible] = useState(false)
    const [successModalVisible, setSuccessModalVisible] = useState(false)

    useEffect(() => {
        if(isSubmitted){
           classSyllabi.id === '' ? handleAddSyllabus() : handleUpdateSyllabus()
           setIsSubmitted(false)
        } 
        if(error.length !== 0) setHasError(true)

    }, [isSubmitted,
        classSyllabi,
        syllabus,
        error]);


    const colors = [0,1,2,3,4,5,6,7,8,9,10,11];
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

    const handleValidSchedule = () => {
        if(classSyllabi.teacherName === ''){
            setInvalidMessage('Please enter Teacher Name')
            return false
        }else if(classSyllabi.classCode === ''){
            setInvalidMessage('Please enter Class Code')
            return false
        }else if(classSyllabi.className === ''){
            setInvalidMessage('Please enter Class Name')
            return false
        }else if(classSyllabi.schedule === ''){
            setInvalidMessage('Please enter Schedule')
            return false
        }
        return true    
    }

    const handleUpdateSyllabus = async() => {
        if (handleValidSchedule()){
            let userId = state.userId
            let token = state.token
            await dispatch(updateSyllabus(classSyllabi, userId, token))
            if(hasError){
                Alert.alert("Error", error);
            }else{
                setSuccessMessage('Your class has been updated!')
                setIsLoading(false)
                setTimeout(function(){setSuccessModalVisible(true)}, 1000)
            }
        }else{
            Alert.alert('Required field', JSON.stringify(invalidMessage))
        }
    }
    
    const handleAddSyllabus = async() => {
        if (handleValidSchedule()){
            let userId = state.userId
            let token = state.token
            await dispatch(addSyllabus(classSyllabi, userId, token))
            if(hasError){
                Alert.alert("Error", error);
            }else{
                setSuccessMessage('You class has been added!')
                setIsLoading(false)
                setTimeout(function(){setSuccessModalVisible(true)}, 1000)
            }
        }else{
            Alert.alert('Required field', JSON.stringify(invalidMessage))
        }
    }

    const handleSubmitSyllabus = () => {
        setConfirmationVisible(false)
        setIsLoading(true)
        if(isOtherScheduleSelected) handleSetSchedule(otherSchedule)
        setIsSubmitted(true)
    }

    const handleSetSchedule = (schedule) => {
        let dataArray = classSyllabi.scheduleList;  
        if (dataArray.includes(schedule)){
            var index = dataArray.indexOf(schedule)
            dataArray.splice(index, 1)
        }else{
            dataArray.push(schedule) 
        }
        let schedules = (dataArray.map(
            function(data){
                return data;
        }).join("|"));

        setClassSyllabi({...classSyllabi, 
                scheduleList: dataArray,
                schedule: schedules})
    }
    return {
       colors,
       bgColor,
       successMessage,
       successModalVisible,
       otherSchedule,
       isOtherScheduleSelected,
       isLoading,
       confirmationVisible,
       confirmationMessage,
       setConfirmationMessage,
       setConfirmationVisible,
       setIsOtherScheduleSelected,
       setOtherSchedule,
       setSuccessModalVisible,
       handleSubmitSyllabus,
       handleSetSchedule,
       setIsSubmitted
    };
  };
  
  export default method;