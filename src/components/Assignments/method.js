import React, { useState,useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Context as AuthContext } from '../../components/Context/AuthContext';
import { 
  addAssignments, 
  updateAssignment, 
  deleteAssignment, 
  completeAssignment, 
  getAssignmentsByUser,
  getAttachmentsByAssignmentId
} from '../../actions/assignments';
import {
  getGoalByUser
} from '../../actions/goal';
import {
  getSyllabusByUser
} from '../../actions/syllabus';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, { types } from 'react-native-document-picker';

const method = (props) => {
  const dispatch = useDispatch();

  const [markedDatesArray, setMarkedDatesArray] = useState([]);
  const [allDatesArray, setAllDatesArray] = useState([]);
  const [isShowAll, setIsShowAll] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [syllabusId, setSyllabusId] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [titleHasError, setTitleHasError] = useState(false);
  const [dueDateHasError, setDueDateHasError] = useState(false);
  const [classHasError, setClassHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentModalTime, setCurrentModalTime] = useState(Moment(new Date()).format("HH:mm"));
  const [successMessage, setSuccessMessage] = useState('');
  const [successTitle, setSuccessTitle] = useState('');
  const [successModalVisible, setSuccessModalVisible] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [classAssignments, setClassAssignments] = useState({
    id: '',
    title: '',
    notes: '',
    dueDate: new Date(),
    attachments: [],
    attachmentFileName: ''
  });
  const [assignmentData, setAssignmentData] = useState([])
  const [confirmationVisible, setConfirmationVisible] = React.useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState("");
  const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);
  const [item, setItem] = useState();

  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [attachmentsVisible, setAttachmentsVisible] = useState(false);
  const [note, setNote] = useState('');

  const { state } = useContext(AuthContext);
  const { syllabus } = useSelector(state => state.syllabusReducer);
  const { assignments } = useSelector(state => state.assignmentsReducer);
  
  const [hasError, setHasError] = useState(false);

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
  
  useEffect(async () => {
    let userId = state.userId
    let token = state.token;
    // await AsyncStorage.removeItem('assignments')
    await dispatch(getAssignmentsByUser(userId, token));
    // console.log("userId")
    // console.log(userId)
    // if(userId == null) {
    //   console.log("dispatching syllabus")
    if(!userId)
      await dispatch(getSyllabusByUser(0, token));
    await dispatch(getGoalByUser(userId, token));
    // }
    // useEffectFunction();
    console.log('dispatching another assignment')
  }, []);

  useEffect(() => {
    if(assignments.length > 0)
      console.log("CHANGING LENGTH--------------------------------------------------------")
    useEffectFunction();
  }, [assignments.length])

  useEffect(async () => {
    tmpAssignmentData = await AsyncStorage.getItem('assignments');
    // console.log(tmpAssignmentData)
    if(tmpAssignmentData) {
      console.log("-=-REFRESHING STORAGE-=-") 
      callAssignmentsFromCurrentDate()
    }
  }, [props.counter])

  // console.log(props)
  // useEffect(async () => {
  //   setAssignmentData(JSON.parse(await AsyncStorage.getItem('assignments')))
  // }, [props.route.params.counter])
  useEffect(()=> {
    callAssignmentsFromCurrentDate()
  }, [props.selectedDate]);

  useEffect(() => {
    console.log("IS PRESED " + props.chosenCalendarDate)
    callAssignmentsFromCurrentDate(Moment(props.chosenCalendarDate).format("YYYY-MM-DD"))
  }, [props.calendarOpened]);

  const useEffectFunction = async (status = "") => {
    fetchedDates = [];
    console.log("The length is zaaaa " + assignments.length)
    // console.log(assignments)
    if(assignments.length > 0) {
      tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
      if(tmpAssignmentData == null) {
        await AsyncStorage.setItem('assignments', JSON.stringify(assignments))
        console.log("NEW STORAGE")
      } else {
        // if(JSON.stringify(tmpAssignmentData) !== JSON.stringify(assignments)) {
        //   console.log("assn")
        //   console.log(assignments)
        //   await AsyncStorage.setItem('assignments', JSON.stringify(assignments))
        //   tmpAssignmentData = assignments;
        //   console.log("TOOK FROM STORAGE BUT RESETTED")
        // }
      }

      if(tmpAssignmentData == null) {
        // setAssignmentData(assignments);
        callAssignmentsFromCurrentDate(null, assignments);
      } else {
        console.log("LOADED STORAGE")
        // setAssignmentData(tmpAssignmentData);
        callAssignmentsFromCurrentDate(null, tmpAssignmentData);
      }

      // console.log(JSON.parse(await AsyncStorage.getItem('assignments')))
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
      // console.log("fetchedDates")
      // console.log(fetchedDates)
      for (let i = 0; i < fetchedDates.length; i++) {
        if(selectedDateY === fetchedDates[i].date && !hasData) {
          hasData = true;
          setCardData(fetchedDates[i].data);
        }
      }

      console.log(ds)

      if(!hasData) {
        setCardData([]);
      } 
      if(status === "success") {
        callme(selectedDate, ds)
      }
    } else {
      await AsyncStorage.removeItem('assignments');
      // setAssignmentData([])
    }
  }

  const editCardData = (res) => {
    toggleModal();
    setSyllabusId(res.syllabusId)
    console.log(res)
    let tempAtt = res.attachmentFileName;
    if(tempAtt == null)
      tempAtt = [];
    setClassAssignments({...classAssignments, 
      id: res.id, 
      title: res.assignmentTitle, 
      dueDate: res.assignmentDateEnd, 
      notes: res.notes,
      syllabusId: res.syllabusId,
      attachments: res.attachment,
      attachmentFileName: tempAtt
    });
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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

  const handleCallback = async(id) => {
    setClassHasError(false)
    setSyllabusId(id);
    setClassAssignments({...classAssignments, syllabusId: id})
  }

  const toggleAttachments = async (item) => {
    console.log(item)
    let token = state.token;
    let res = await dispatch(getAttachmentsByAssignmentId(item.id, token))
    // console.log(await AsyncStorage.getItem("attachmentUrl"));
    // return;
    let theUrl = await AsyncStorage.getItem("attachmentUrl");
    setNote(item.notes);
    setAttachmentsVisible(!attachmentsVisible);
    if(item.attachmentFileName != null) {
        console.log('is true')
        setAttachments(item.attachmentFileName)
        setAttachmentUrl(theUrl)
        console.log(item.attachment)
    }
    else {
        setAttachments("")
        setAttachmentUrl("")
    }
  }

  const callAssignmentsFromCurrentDate = async (date = null, arr = null) => {

    let d = new Date(props.selectedDate);
    if(date !== null)
      d = new Date(date);
    let m = (d.getMonth()+1);
    if(m.toString().length === 1) {
      m = "0" + m;
    }
    let dt = d.getDate();
    if(dt.toString().length === 1) {
      dt = "0" + dt;
    }
    let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;

    if(arr)
      tmpAssignmentData = arr;
    else
      tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
    // console.log("classAssignments.dueDate")
    // console.log(classAssignments.dueDate)
    // console.log("tmpAssignmentData--")
    // console.log(tmpAssignmentData)
    let dateArr = [];
    for(let i = 0; i < tmpAssignmentData.length; i++) {
      if(tmpAssignmentData[i]['assignmentDateEnd'].split('T')[0].toString() == selectedDateY) {
        dateArr.push(tmpAssignmentData[i]);
      }
    }
    // console.log(dateArr)
    setAssignmentData(dateArr);
  }
  const handleAddAssignments = async() => {
    console.log('saving...assignments')
    let userId = state.userId;
    let token = await AsyncStorage.getItem('userToken');
    let pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date(classAssignments.dueDate);
    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + 'T' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
    // setClassAssignments({ ...classAssignments, dueDate: date });
    await dispatch(addAssignments(classAssignments, userId, token, date));
    if(hasError){
        Alert.alert("Error", error);
    }else{
        await dispatch(getAssignmentsByUser(userId, token));
        setSuccessMessage('Your assignment has been created!');
        setSuccessTitle('Congratulations!');
        let newArr = markedDatesArray;
        // tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
        // tmpAssignmentData[i].assignmentTitle = classAssignments.title;
        // tmpAssignmentData[i].assignmentDateStart = date;
        // tmpAssignmentData[i].assignmentDateEnd = date;
        // tmpAssignmentData[i].notes = classAssignments.notes;
        // tmpAssignmentData[i].syllabusId = classAssignments.syllabusId;
        // if(classAssignments.attachments) {
        //   tmpAssignmentData[i].attachmentFileName = classAssignments.attachmentFileName;
        //   tmpAssignmentData[i].attachment = classAssignments.attachments.uri;
        // }
        // tmpAssignmentData.push({
        //   id: '', 
        //   title: '', 
        //   dueDate: '', 
        //   notes: '',
        //   attachments: []
        // });
        // await AsyncStorage.setItem('assignments', JSON.stringify(tmpAssignmentData))

        callAssignmentsFromCurrentDate();
        setMarkedDatesArray(newArr);
        toggleModal();
        setTimeout(() => {
          setSuccessModalVisible(true);
        }, 300);
        setSelectedDate(date);
    }
};

  const handleUpdateAssignment = async() => {
    let userId = state.userId;
    let token = await AsyncStorage.getItem('userToken');
    let pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date(classAssignments.dueDate);
    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + 'T' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
    await dispatch(updateAssignment(classAssignments, userId, token, date));
    
    if(hasError){
        Alert.alert("Error", error);
    }else{
        setSuccessMessage('Your Assignment has been updated!');
        setSuccessTitle('Success!');
        let newArr = markedDatesArray;
        tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
        console.log("tmpAssignmentData")
        console.log(tmpAssignmentData)
        for(let i = 0; i < tmpAssignmentData.length; i++) {
          if(tmpAssignmentData[i]['id'] === classAssignments.id) {
            console.log("classAssignments")
            console.log(classAssignments)
            tmpAssignmentData[i].assignmentTitle = classAssignments.title;
            tmpAssignmentData[i].assignmentDateStart = date;
            tmpAssignmentData[i].assignmentDateEnd = date;
            tmpAssignmentData[i].notes = classAssignments.notes;
            tmpAssignmentData[i].syllabusId = classAssignments.syllabusId;
            if(classAssignments.attachments) {
              tmpAssignmentData[i].attachmentFileName = classAssignments.attachmentFileName;
              tmpAssignmentData[i].attachment = classAssignments.attachments.uri;
            }
            console.log("tmpAssignmentData aa")
            console.log(tmpAssignmentData)
            await AsyncStorage.setItem('assignments', JSON.stringify(tmpAssignmentData))
          }
        }
        callAssignmentsFromCurrentDate();

        date = date.split("T")[0];
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
        setSelectedDate(date);
        setTimeout(() => {
          setSuccessModalVisible(true);
        }, 300);
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

        tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
        let spliceId = 0;
        for(let i = 0; i < tmpAssignmentData.length; i++) {
          if(tmpAssignmentData[i]['id'] === assignment.id) {
            spliceId = i;
            
          }
        }

        console.log("deleting")
        console.log(tmpAssignmentData)
        tmpAssignmentData.splice(spliceId, 1);
        console.log(tmpAssignmentData)
        await AsyncStorage.setItem('assignments', JSON.stringify(tmpAssignmentData))
        callAssignmentsFromCurrentDate();

        setTimeout(() => {
          setSuccessModalVisible(true);
        }, 500);
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
        
        tmpAssignmentData = JSON.parse(await AsyncStorage.getItem('assignments'));
        let spliceId = 0;
        for(let i = 0; i < tmpAssignmentData.length; i++) {
          if(tmpAssignmentData[i]['id'] === assignment.id) {
            spliceId = i;
            
          }
        }

        console.log("deleting")
        console.log(tmpAssignmentData)
        tmpAssignmentData.splice(spliceId, 1);
        console.log(tmpAssignmentData)
        await AsyncStorage.setItem('assignments', JSON.stringify(tmpAssignmentData))
        callAssignmentsFromCurrentDate();

        setTimeout(() => {
          setSuccessModalVisible(true);
        }, 400);

        setMarkedDatesArray(newArr);
        setSelectedDate(currentDate);
    }
}

  const saveAssignment = async () => {
    let userId = state.userId;
    if(userId) {
      console.log("saving")
      if(classAssignments.dueDate !== "" && classAssignments.title !== "" && classAssignments.syllabusId !== "") {
        if(classAssignments.id !== '')
          handleUpdateAssignment();
        else
          handleAddAssignments();
        console.log("is updating or saving")
      } else {
        console.log("has error")
        setErrorMessage(true);
        if(!classAssignments.title)
          setTitleHasError(true);
        if(!classAssignments.dueDate)
          setDuedateHasError(true);
        if(!classAssignments.syllabusId)
          setClassHasError(true);
      }
    } else {
      console.log("not saving")
      setNotAvailableModalVisible(true);
    }
  }

  const openConfirmationModal = (item, message = '', status = '') => {
    if(state.userId) {
      setItem(item);
      setConfirmationVisible(true);
      setConfirmationMessage(message);
      setConfirmationStatus(status);
    } else {
      setNotAvailableModalVisible(true)
    }
  }

  const handleAddFile = async() => {
    if(state.userId) {
      const attachment = await DocumentPicker.pickSingle({
          type: [types.pdf, types.images]
      });
      
      let attachmentsArray = attachments;
      attachmentsArray.push(attachment);
      setClassAssignments({...classAssignments, attachments: attachmentsArray[0], attachmentFileName: attachmentsArray[0].name})
      setIsAwait(isAwait+1);
    } else {
      setNotAvailableModalVisible(true)
    }
  }

  return{
    syllabus,
    bgColor,
    markedDatesArray,
    allDatesArray,
    isShowAll,
    cardData,
    isModalVisible,
    titleHasError,
    dueDateHasError,
    classHasError,
    syllabusId,
    attachments,
    errorMessage,
    calendarVisible,
    classAssignments,
    currentModalTime,
    successMessage,
    successTitle, 
    successModalVisible,
    assignmentData,
    confirmationMessage,
    confirmationVisible,
    confirmationStatus,
    item, 
    note,
    attachmentsVisible,
    attachmentUrl,
    isAttachmentVisible,
    notAvailableModalVisible,
    setNotAvailableModalVisible,
    setIsAttachmentVisible,
    setAttachmentUrl,
    setAttachmentsVisible,
    setNote,
    setItem,
    setConfirmationStatus,
    setConfirmationVisible,
    setConfirmationMessage,
    setAssignmentData,
    setSuccessModalVisible,
    setSuccessTitle,
    setSuccessMessage,
    setCurrentModalTime,
    setClassAssignments,
    setCalendarVisible,
    setErrorMessage,
    setAttachments,
    setSyllabusId,
    setClassHasError,
    setDueDateHasError,
    setTitleHasError,
    setIsModalVisible,
    setCardData,
    setIsShowAll,
    setAllDatesArray,
    setMarkedDatesArray,
    setBgColor,
    editCardData,
    toggleModal,
    toggleAttachments,
    handleCallback,
    saveAssignment,
    openConfirmationModal,
    handleDeleteAssignment,
    handleCompleteAssignment,
    callAssignmentsFromCurrentDate,
    handleAddFile
  }
}

export default method;