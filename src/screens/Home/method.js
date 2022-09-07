import React, { useState,useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import { addNotificationToken } from '../../actions/notification';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { Alert } from 'react-native';
import { addAssignments, updateAssignment, deleteAssignment, completeAssignment, getAssignmentsByUser } from '../../actions/assignments';
import AsyncStorage from '@react-native-community/async-storage';

const method = () => {

    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const [hasError, setHasError] = useState(false);

    const [cardData, setCardData] = useState([]);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [successMessage, setSuccessMessage] = useState('');
    const [successTitle, setSuccessTitle] = useState('');
    const [classAssignments, setClassAssignments] = useState({
        id: '',
        title: '',
        notes: '',
        dueDate: new Date(),
        attachments: [],
        attachmentFileName: ''
    });
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [syllabusId, setSyllabusId] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState('');
    
    const dispatch = useDispatch();
    const fetchUser = () => {
        let userId = state.userId
        let token = state.token
        dispatch(getUser(userId, token));
    }

    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        const fcmToken = await messaging().getToken();
        handleFcmToken(fcmToken)
        console.log('Authorization status:', authStatus);
      }
  }

  const handleFcmToken = (fcmToken) => {
      if (fcmToken) {
        let userId = state.userId
        let token = state.token
        dispatch(addNotificationToken(userId, token, fcmToken));
       //console.log(fcmToken);
      } else {
       //console.log("Failed", "No token received");
      }
  }

  const createNotificationListeners = () => {
    messaging().onTokenRefresh(fcmToken => {
      handleFcmToken(fcmToken)
    });  
  }

  useEffect(() => {
      fetchUser();
      requestUserPermission();
      createNotificationListeners();
  }, [state]);

  const callme = (date, ds = null) => {
    const d = new Date(date);
    let m = (d.getMonth()+1);
    if(m.toString().length === 1) {
      m = "0" + m;
    }
    let dt = d.getDate();
    if(dt.toString().length === 1) {
      dt = "0" + dt;
    }
    let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
    let markedDates = markedDatesArray;
    if(ds != null)
        markedDates = ds;
    let hasData = false;
    for (let i = 0; i < markedDates.length; i++) {
      if(selectedDateY === markedDates[i].date && !hasData) {
        hasData = true;
        setCardData(markedDates[i].data);
      }
    }
    
    if(!hasData) {
      setCardData([]);
    } 
    setSelectedDate(selectedDateY)
  }


  const handleUpdateAssignment = async() => {
      let userId = state.userId;
      let token = await AsyncStorage.getItem('userToken');
      let date = classAssignments.dueDate;
      date = date;
      console.log("classAssignments")
      console.log(classAssignments)
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

  const toggleModal = () => {
    console.log("toggleModal")
    setModalVisible(!isModalVisible);
    if(!isModalVisible) {
        setSyllabusId(null);
        setClassAssignments({...classAssignments, 
        id: '', 
        title: '', 
        dueDate: '', 
        notes: '',
        attachments: []
        });
        setAttachments([]);
    }
  };

  const useEffectFunction = (status = "") => {
      fetchedDates = [];
      if(assignments.length > 0) {
        let dates = [];
        for(let i = 0; i < assignments.length; i++) {
          let thedate = assignments[i]["assignmentDateEnd"].split("T")[0];
          if(dates.indexOf(thedate) < 0) {
            dates.push(thedate);
          }
        }
        dates = dates.sort();
        for(let i = 0; i < dates.length; i++) {
          let newArr = assignments.filter(x => x.assignmentDateEnd.split("T")[0] === dates[i]);
          let dots = [];
          let newArrCount = newArr.length;
          let j = 0;
          for (let assignment of newArr) {
            let color = '#000';
            for (let syllabi of syllabus) {
              if (syllabi.id == assignment.syllabusId) {
                color = bgColor[syllabi.colorInHex][1]
              }
            }
            dots.push({
              id: 'item' + i + j,
              color: color
            })
            j++;
          }
          fetchedDates.push({date: dates[i], dots: dots, data: newArr});
        }
        let ds = [];
        for (let i = 0; i < fetchedDates.length; i++) {
          ds.push({
            date: fetchedDates[i].date,
            dots: fetchedDates[i].dots,
            data: fetchedDates[i].data
          });
        }
        setMarkedDatesArray(ds);
  
        const d = new Date();
        let m = (d.getMonth()+1);
        if(m.toString().length === 1) {
          m = "0" + m;
        }
        let dt = d.getDate();
        if(dt.toString().length === 1) {
          dt = "0" + dt;
        }
        let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
        let hasData = false;
        for (let i = 0; i < fetchedDates.length; i++) {
          if(selectedDateY === fetchedDates[i].date && !hasData) {
            hasData = true;
            setCardData(fetchedDates[i].data);
          }
        }
  
        if(!hasData) {
          setCardData([]);
        } 
        if(status === "success") {
          callme(selectedDate, ds)
        }
      }
  }

    return {
        cardData,
        selectedDate,
        markedDatesArray,
        classAssignments,
        successMessage,
        successTitle,
        successModalVisible,
        isModalVisible,
        syllabusId,
        attachments,
        confirmationVisible,
        confirmationMessage,
        setConfirmationMessage,
        setConfirmationVisible,
        setAttachments,
        setSyllabusId,
        setModalVisible,
        setSuccessModalVisible,
        setSuccessTitle,
        setSuccessMessage,
        setClassAssignments,
        setCardData,
        setSelectedDate,
        setMarkedDatesArray,
        callme,
        handleCompleteAssignment,
        handleDeleteAssignment,
        handleUpdateAssignment,
        toggleModal,
        useEffectFunction,
    };
  };
  
  export default method;