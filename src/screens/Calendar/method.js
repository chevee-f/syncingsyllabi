import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { addAssignments, updateAssignment, deleteAssignment, completeAssignment, getAssignmentsByUser } from '../../actions/assignments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

const method = () => {
    
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();
    let fetchedDates = [];
      
    const [weekday, setWeekday] = useState([-1]);
    const [hasError, setHasError] = useState(false);
    const [markedDatesArray, setMarkedDatesArray] = useState([]);
    const [calendarMarkedDatesArray, setCalendarMarkedDatesArray] = useState([]);
    const [stripMarkedDatesArray, setStripMarkedDatesArray] = useState([]);
    const [allDatesArray, setAllDatesArray] = useState([]);
    const { assignments } = useSelector(state => state.assignmentsReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const [classAssignments, setClassAssignments] = useState({
        id: '',
        title: '',
        notes: '',
        dueDate: new Date(),
    });
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
    // console.log("current day c = " + selectedDate);
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
        let hasData = false;
        let markedDates = markedDatesArray;
        if(ds != null)
            markedDates = ds;
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
        //   {
        //     '2022-08-15': {
        //         dots: [
        //             {key: 'vacation', color: 'red', selectedDotColor: 'blue'}, 
        //             {key: 'massage', color: 'blue', selectedDotColor: 'blue'}
        //         ], 
        //         selected: true, 
        //         selectedColor: 'red'
        //     },
        //     '2022-08-16': {
        //         dots: [
        //             {key: 'vacation', color: 'red', selectedDotColor: 'blue'}, 
        //             {key: 'massage', color: 'blue', selectedDotColor: 'blue'}
        //         ]
        //     },
        //     '2022-08-17': {
        //         dots: [
        //             {key: 'vacation', color: 'red', selectedDotColor: 'blue'}, 
        //             {key: 'massage', color: 'blue', selectedDotColor: 'blue'}
        //         ], 
        //         disabled: true
        //     },
        // }
            let tmp = {};
            for (let i = 0; i < fetchedDates.length; i++) {
                // console.log(fetchedDates[i].data[0].assignmentDateEnd);
                let dots = [];
                for (let j = 0; j < fetchedDates[i].data.length; j++) {
                    dots.push({
                        "key": fetchedDates[i].data[j].id,
                        "color": "blue"
                    })
                }
                console.log("selectedDate")
                console.log(selectedDate)
                let isSelected = false;
                if(selectedDate == fetchedDates[i].date)
                    isSelected = true;
                tmp[fetchedDates[i].date] = {
                    'dots': dots,
                    'selected': isSelected, 
                    'selectedColor': 'red'
                }
                
            }
            // console.log(tmp['2022-08-30'])
            setCalendarMarkedDatesArray(tmp)
            setMarkedDatesArray(fetchedDates);
        
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
    // const callme = (date) => {
    //     // let userId = state.userId;
    //     // let token = state.token;
    //     // await dispatch(getAssignmentsByUser(userId, token));
    //     const d = new Date(date);
    //     // console.log("calling call me " + d);
    //     let m = (d.getMonth()+1);
    //     if(m.toString().length === 1) {
    //       m = "0" + m;
    //     }
    //     let dt = d.getDate();
    //     if(dt.toString().length === 1) {
    //       dt = "0" + dt;
    //     }
    //     let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
    //     // console.log(selectedDateY)
    //     // console.log(markedDatesArray)
    //     // console.log("markedDatesArray")
    //     let dates = [];
    //     let ds = {};
    //     for (const key in markedDatesArray) {
    //             // console.log(`${key}`);
    //             dates.push(key);
    //             let ddata = [];
    //             let data = markedDatesArray[key].data;
    //             const assignmentTitle = "assignmentTitle";
    //             const assignmentDateEnd = "assignmentDateEnd";
    //             const notes = "notes";
    //             const syllabusId = "syllabusId";
    //             if( (selectedDateY == data[0].assignmentDateEnd.split("T")[0])) {
    //                 for(let i = 0; i < data.length; i++) {
    //                     ddata.push({ 
    //                         [assignmentTitle]: data[i].assignmentTitle, 
    //                         [assignmentDateEnd]: data[i].assignmentDateEnd, 
    //                         [notes]: data[i].notes,
    //                         [syllabusId]: data[i].syllabusId 
    //                     });
    //                 }
    //                 ds[key] = ddata;
    //             }
    //     }
    //     setCardData(ds);
    //     console.log("ds")
    //     console.log(ds)
    //     /*
    //     {
    //         "2022-04-29": [{"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "New Assignment 1", "notes": "My Note 29th"}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "CSS 1", "notes": ""}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "123", "notes": ""}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "zxc", "notes": ""}], 
    //         "2022-05-25": [{"assignmentDateEnd": "2022-05-25T00:00:00", "assignmentTitle": "Moin", "notes": "My Noteasd"}]
    //     }

    //     {
    //         "2022-04-29": [{assignmentTitle: 'my name', assignmentDateEnd: '2022-04-29', notes: 'my note'}]
    //     }
    //     */
    //     // console.log(markedDatesArray[date].data)
    //     // setCardData(markedDatesArray[date].data);
    //     // let hasData = false;
    //     for (let i = 0; i < markedDatesArray.length; i++) {
    //     //   if(selectedDateY === markedDatesArray[i].date && !hasData) {
    //     //     console.log("setting card data for " + selectedDateY);
    //     //     console.log(markedDatesArray[i].data);
    //     //     hasData = true;
    //     //     setCardData(markedDatesArray[i].data);
    //     //   }
    //     }
        
    //     // console.log("has data " + hasData);
    //     // if(!hasData) {
    //     //   setCardData([]);
    //     // } 
    //     setSelectedDate(selectedDateY)
    //   }

    return {
        classAssignments,
        weekday,
        markedDatesArray,
        stripMarkedDatesArray,
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
        calendarMarkedDatesArray,
        setCalendarMarkedDatesArray,
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
        setStripMarkedDatesArray,
        setClassAssignments,
        setWeekday,
        addSchedule,
        handleAddAssignments,
        handleUpdateAssignment,
        handleDeleteAssignment,
        handleCompleteAssignment,   
        handleSortAssignment,
        callme,
        useEffectFunction
    };
};
  
export default method;