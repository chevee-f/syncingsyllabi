import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { addAssignments, updateAssignment, deleteAssignment, completeAssignment, getAssignmentsByUser } from '../../actions/assignments';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

const method = () => {
    
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();
      
    const [weekday, setWeekday] = useState([-1]);
    const [hasError, setHasError] = useState(false);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);
    const [allDatesArray, setAllDatesArray] = useState([]);
    const [classAssignments, setClassAssignments] = useState({
        id: '',
        title: '',
        notes: '',
        dueDate: new Date(),
    });

    useEffect(() => {
        if(error.length !== 0) setHasError(true)
    }, [error]);

    const handleAddAssignments = async() => {
        let userId = state.userId;
        let token = await AsyncStorage.getItem('userToken');
        let pad = function(num) { return ('00'+num).slice(-2) };
        let date = new Date(classAssignments.dueDate);
        date = date.getUTCFullYear()         + '-' +
                pad(date.getUTCMonth() + 1)  + '-' +
                pad(date.getUTCDate())       + 'T' +
                pad(date.getUTCHours())      + ':' +
                pad(date.getUTCMinutes())    + ':' +
                pad(date.getUTCSeconds())    + 'Z';
                console.log(date);
        // setClassAssignments({ ...classAssignments, dueDate: date });
        await dispatch(addAssignments(classAssignments, userId, token, date));
        if(hasError){
            Alert.alert("Error", error);
        }else{
            setSuccessMessage('Your assignment has been created!');
            setSuccessTitle('Congratulations!');
            let newArr = markedDatesArray;
            
            setMarkedDatesArray(newArr);
            toggleModal();
            setSuccessModalVisible(true);
            setSelectedDate(date);
        }
    };

    const handleUpdateAssignment = async() => {
        let userId = state.userId;
        let token = await AsyncStorage.getItem('userToken');
        let date = classAssignments.dueDate;
        date = date + 'Z';
        await dispatch(updateAssignment(classAssignments, userId, token, date));
        
        if(hasError){
            Alert.alert("Error", error);
        }else{
            setSuccessMessage('Your Assignment has been updated!');
            setSuccessTitle('Success!');
            date = date.split("T")[0];
            let newArr = markedDatesArray;
            for(let i = 0; i < newArr.length; i++) {
                if(date === newArr[i].date) {
                    for(let j = 0; j < newArr[i].data.length; j++) {
                        if(newArr[i].data[j]['id'] === classAssignments.id) {
                            newArr[i].data[j].assignmentTitle = classAssignments.title;
                            newArr[i].data[j].assignmentDateStart = classAssignments.dueDate;
                            newArr[i].data[j].assignmentDateEnd = classAssignments.dueDate;
                            newArr[i].data[j].notes = classAssignments.notes;
                            newArr[i].data[j].syllabusId = classAssignments.syllabusId;
                        }
                    }
                }
            }
            setMarkedDatesArray(newArr);
            toggleModal();
            setSuccessModalVisible(true);
            setSelectedDate(date);
        }
    };

    const handleDeleteAssignment = async(assignment) => {
        let userId = state.userId;
        let token = await AsyncStorage.getItem('userToken');
        await dispatch(deleteAssignment(assignment.id, userId, token));
        // console.log(assignment);
        let currentDate = assignment.assignmentDateEnd.split("T")[0];
        if(hasError){
            Alert.alert("Error", error);
        }else{
            setSuccessMessage('You just removed one of your assignments!');
            setSuccessTitle('Success');
            setSuccessModalVisible(true);
            setConfirmationVisible(false);
            let newArr = markedDatesArray;
            for(let i = 0; i < newArr.length; i++) {
                if(currentDate === newArr[i].date) {
                    for(let j = 0; j < newArr[i].data.length; j++) {
                        console.log(newArr[i].data[j]['id'] === assignment.id)
                        if(newArr[i].data[j]['id'] === assignment.id) {
                            newArr[i].data.splice(j, 1);
                        }
                    }
                }
            }
            setMarkedDatesArray(newArr);
            setSelectedDate(currentDate);
        }
    }

    const handleCompleteAssignment = async(assignment) => {
        let userId = state.userId;
        let token = await AsyncStorage.getItem('userToken');
        await dispatch(completeAssignment(assignment, userId, token));
        let currentDate = assignment.assignmentDateEnd.split("T")[0];
        if(hasError){
            Alert.alert("Error", error);
        }else{
            setSuccessMessage('You just completed one of your assignments!');
            setSuccessTitle('Congratulations!');
            setSuccessModalVisible(true);
            setConfirmationVisible(false);
            let newArr = markedDatesArray;
            for(let i = 0; i < newArr.length; i++) {
                if(currentDate === newArr[i].date) {
                    for(let j = 0; j < newArr[i].data.length; j++) {
                        console.log(newArr[i].data[j]['id'] === assignment.id)
                        if(newArr[i].data[j]['id'] === assignment.id) {
                            newArr[i].data.splice(j, 1);
                        }
                    }
                }
            }
            setMarkedDatesArray(newArr);
            setSelectedDate(currentDate);
        }
    }

    const handleSortAssignment = async(sort, date, showAll = false) => {
        const SortByName = (a, b) => {
            var aName = a[sort].toString().toLowerCase();
            var bName = b[sort].toString().toLowerCase(); 
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        let currentDate = Moment(selectedDate).format("YYYY-MM-DD");
        let newArr = markedDatesArray;
        if(!showAll) {
            for(let i = 0; i < newArr.length; i++) {
                if(currentDate === newArr[i].date) {
                    newArr[i].data.sort(SortByName);
                }
            }
        } else {
            allDatesArray.sort(SortByName);
        }
    }

    const addSchedule = () => {
        if(weekday === -1){
            Alert.alert('Please select day')
        }else{
            let dataArray = classAssignments.scheduleList;  

            let startTimeHour = Moment(classAssignments.scheduleStartTime).format("h")
            let startTimeMinute = Moment(classAssignments.scheduleStartTime).format("m")
            let startTimeDesc = Moment(classAssignments.scheduleStartTime).format("a")
            let startTime = startTimeMinute > 0 ? `${startTimeHour}:${startTimeMinute}${startTimeDesc}`:
                            `${startTimeHour}${startTimeDesc}`

            let endTimeHour = Moment(classAssignments.scheduleEndTime).format("h")
            let endTimeMinute = Moment(classAssignments.scheduleEndTime).format("m")
            let endTimeDesc = Moment(classAssignments.scheduleEndTime).format("a")
            let endTime = endTimeMinute > 0 ? `${endTimeHour}:${endTimeMinute}${endTimeDesc}`:
                            `${endTimeHour}${endTimeDesc}`

            dataArray.push({schedule: `${days[weekday - 1]} ${startTime}-${endTime}`,
                            dayNo: weekday,
                            startTime: classAssignments.scheduleStartTime,
                            endTime: classAssignments.scheduleEndTime
                          });
            setClassAssignments({...classAssignments, scheduleList: dataArray})
            let schedules = (dataArray.map(
                            function(data){
                                return data.schedule;
                            }).join("|"));
            setClassAssignments({...classAssignments, schedule: schedules})
        }
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    console.log("current day = " + selectedDate);
    const [successMessage, setSuccessMessage] = useState('');
    const [successTitle, setSuccessTitle] = useState('');
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [action, setAction] = React.useState('')
    const [confirmationVisible, setConfirmationVisible] = React.useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [cardData, setCardData] = React.useState([]);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      if(!isModalVisible) {
        setClassAssignments({...classAssignments, 
          id: '', 
          title: '', 
          dueDate: '', 
          notes: ''
        });
      }
    };

    const callme = (date) => {
        // let userId = state.userId;
        // let token = state.token;
        // await dispatch(getAssignmentsByUser(userId, token));
        const d = new Date(date);
        console.log("calling call me " + d);
        let m = (d.getMonth()+1);
        if(m.toString().length === 1) {
          m = "0" + m;
        }
        let dt = d.getDate();
        if(dt.toString().length === 1) {
          dt = "0" + dt;
        }
        let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
        console.log(selectedDateY)
        console.log(markedDatesArray)
        let hasData = false;
        for (let i = 0; i < markedDatesArray.length; i++) {
          if(selectedDateY === markedDatesArray[i].date && !hasData) {
            console.log("setting card data for " + selectedDateY);
            console.log(markedDatesArray[i].data);
            hasData = true;
            setCardData(markedDatesArray[i].data);
          }
        }
        
        console.log("has data " + hasData);
        if(!hasData) {
          setCardData([]);
        } 
        setSelectedDate(selectedDateY)
      }

    return {
        classAssignments,
        weekday,
        markedDatesArray,
        isModalVisible,
        selectedDate,
        successMessage,
        successModalVisible,
        action,
        confirmationMessage,
        confirmationVisible,
        cardData,
        successTitle,
        allDatesArray,
        setAllDatesArray,
        setSuccessTitle,
        setCardData,
        setConfirmationVisible,
        setConfirmationMessage,
        setAction,
        setSuccessModalVisible,
        setSuccessMessage,
        setSelectedDate,
        setModalVisible,
        toggleModal,
        setMarkedDatesArray,
        setClassAssignments,
        setWeekday,
        addSchedule,
        handleAddAssignments,
        handleUpdateAssignment,
        handleDeleteAssignment,
        handleCompleteAssignment,   
        handleSortAssignment,
        callme
    };
};
  
export default method;