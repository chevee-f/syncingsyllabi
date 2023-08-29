import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import Card from '../../components/Card';
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import label from '../../styles/label'
import color from '../../styles/colors'
import moment from 'moment';
import styles from './styles'
import Goals from '../Goal/Goals'
import method from './method'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalByUser } from '../../actions/goal';
import { getAssignmentsByUser } from '../../actions/assignments';
import Modal from "react-native-modal";
import DateTimePicker from '../../components/DateTimePicker';
import Label from '../../components/Label';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import AddItem from '../../components/AddItem';
import GradientItem from '../../components/GradientItem';
import { TextInput } from 'react-native-paper';
import SecondaryButton from '../../components/SecondaryButton';
import SuccessModal from '../../components/SuccessModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { getSyllabusByUser } from '../../actions/syllabus';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FilePickerManager from 'react-native-file-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { WebView } from 'react-native-webview';
import Assignments from '../../components/Assignments';
import * as RNLocalize from "react-native-localize";
const HomeScreen = (props) => {
  console.log(RNLocalize.getTimeZone())
  const {
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
  } = method();

  let startingDate = moment().subtract(2, 'days');

  const { state } = useContext(AuthContext);
  const { goals } = useSelector(state => state.goalReducer);
  const { assignments } = useSelector(state => state.assignmentsReducer);
  const { syllabus } = useSelector(state => state.syllabusReducer);
  //const { ocrResults } = useSelector(state => state.ocrReducer);

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
  const [file, setFile] = useState(null);

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [titleHasError, setTitleHasError] = useState(false);
  const [classHasError, setClassHasError] = useState(false);
  const [duedateHasError, setDuedateHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [item, setItem] = useState();
  const [confirmationStatus, setConfirmationStatus] = useState("");
  
  const [attachmentsVisible, setAttachmentsVisible] = useState(false);
  const [note, setNote] = useState('');
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");

  const dispatch = useDispatch();

  useEffect(async () => {
  //   console.log("home useeffect in act *************************")
  //     // let userId = state.userId
  //     // let token = state.token
  //     // await dispatch(getAssignmentsByUser(userId, token));
      await dispatch(getGoalByUser(userId, token));
  //     // dispatch(getSyllabusByUser(userId, token));
  //     // console.log(assignments)
  //     // setTimeout(() => {
  //     //   populateAssignment(assignments);
  //     // }, 2000);
  //     // ds = populateAssignment(assignments, true);
  //     // console.log(selectedDate)
  //     // callme(selectedDate, ds)
  
  }, []);

  // useEffect(() => {
  //   console.log("goals useeffect from home")
  // }, [goals.length]);

  // useEffect(() => {
  //   console.log("assignments useeffect from home");
  //   populateAssignment(assignments);
  // }, [assignments.length]);

  useEffect(async() => {
    console.log("counter, populate assignments via HOME" + props.route)
    // ds = populateAssignment(assignments, true);
    // callme(selectedDate, ds);
  }, [props.counter]);

  let fetchedDates = [];
  const populateAssignment = (assignments, isClick = false) => {
    // console.log("populateAssignment")
    // console.log(assignments)
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
        let newArrCount = newArr.length;// > 3 ? 3 : newArr.length;
        for(let j = 0; j < newArrCount; j++) {
          dots.push({
            id: 'item' + i + j,
            color: '#70C862'
          })
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
          // console.log(fetchedDates[i].data)
          hasData = true;
          setCardData(fetchedDates[i].data);
        }
      }

      if(!hasData) {
        setCardData([]);
      } 
      if(isClick == true)
        return ds;
    }
  }

  const handleCallback = async(id) => {
    setClassHasError(false)
    setSyllabusId(id);
    setClassAssignments({...classAssignments, syllabusId: id})
  }

  const toggleAttachments = (item) => {
    console.log(item)
    setNote(item.notes);
    setAttachmentsVisible(!attachmentsVisible);
    if(item.attachmentFileName != null) {
        console.log('is true')
        setAttachments(item.attachmentFileName)
        setAttachmentUrl(item.attachment)
        console.log(item.attachment)
    }
    else {
        setAttachments("")
        setAttachmentUrl("")
    }
  }

  const showAttachment = (tempAttach = '', isAdd = true) => {
    if(Array.isArray(attachments) && tempAttach == '') {
      if(attachments.length > 0)
          tempAttach = attachments[0].name
      else if(!Array.isArray(classAssignments.attachments))
          tempAttach = classAssignments.attachmentFileName
    }
    if(tempAttach != '')
      return (
        <View style={{ marginVertical: 5, paddingHorizontal: 16, paddingVertical: 5, borderWidth: 1, borderStyle: "dashed", borderRadius: 16, width: "100%" }}>
        <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{ width: "85%" }} onPress={() => {
            setAttachmentsVisible(!attachmentsVisible)
            setTimeout(() => {
              // console.log("here")
              setIsAttachmentVisible(!isAttachmentVisible)
            }, 1200)
            
          }}>
            <Text style={{ marginTop: 10, marginBottom: 10, color: '#0036A1', fontSize: 12 }}>{tempAttach}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ 
              paddingLeft: 20, 
              paddingRight: 7, 
              paddingVertical: 7
            }} 
            onPress={() => {
              setClassAssignments({...classAssignments, attachments: []})
              setAttachments([])
            }}>
              <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    else
      if(isAdd) {
        return (
          <View>
            <Text style={{ marginTop: 10, marginBottom: 10, color: '#0036A1' }}>No Attachments</Text>
            <SecondaryButton onPress={async() => {
              const attachment = await DocumentPicker.pickSingle({
                  type: [types.pdf, types.images]
              });
              
              let attachmentsArray = attachments;
              attachmentsArray.push(attachment);
              setClassAssignments({...classAssignments, attachments: attachmentsArray[0]})
              setIsAwait(isAwait+1);
            }} type='add-file' containerStyle={{ width: "100%" }} title="Add File" />
          </View>
        )
      }
  };

  const saveAssignment = async () => {
    if(classAssignments.dueDate !== "" && classAssignments.title !== "" && classAssignments.syllabusId !== "") {
      if(classAssignments.id !== '')
        handleUpdateAssignment();
      else
        handleAddAssignments();
    } else {
      setErrorMessage(true);
      if(!classAssignments.title)
        setTitleHasError(true);
      if(!classAssignments.dueDate)
        setDuedateHasError(true);
      if(!classAssignments.syllabusId)
        setClassHasError(true);
    }
  };

  const openConfirmationModal = (item, message = '', status = '') => {
    setItem(item);
    setConfirmationVisible(true);
    setConfirmationMessage(message);
    setConfirmationStatus(status);
  }

    return (
      <ScrollView style={styles.container}>
        <View style={{margin:20}}>
          <View style={styles.progressContainer}>
            <Text style={[label.boldExtraSmallHeading,{color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>SEMESTER PROGRESS</Text>
            <Text style={[label.extraSmallHeading2,{color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>26/45</Text>
          </View>
          
          <ProgressBar progress={0.5} color={state.isDarkTheme === 'true' ? color.default : color.primary} />
          <Text style={[label.boldExtraSmallHeading, styles.textPercentage, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>57% COMPLETE</Text>
        </View>
        <View>
        <CalendarStrip
          showWeek={false}
          currentScreen={"Home"}
          scrollable
          selectedDate={moment()}
          numDaysInWeek={5}
          style={styles.calendar}
          calendarHeaderFormat='MMMM'
          calendarHeaderStyle={[
            styles.calendarHeader, 
            {color:state.isDarkTheme === 'true' ? color.default : color.primary}
          ]}
          iconContainer={{flex: 0, display: 'none'}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          dateNumberStyle={styles.dateNumber}
          dateNameStyle={styles.dateName}
          weekendDateNumberStyle={styles.weekendDateNumber}
          weekendDateNameStyle={styles.weekendDateName}
          daySelectionAnimation={{ type: 'background', duration: 200}}
          // markedDates={markedDatesArray}
          markedDatesStyle={styles.markedDate}
          highlightDateNumberStyle={styles.highlightDateNumber}
          highlightDateNameStyle={styles.highlightDateName}
          highlightDateContainerStyle={styles.highlightDateContainer}
          upperCaseDays={false}
          dayContainerStyle={styles.dayContainer}
          startingDate={startingDate}
          page={'home'}
          onDateSelected={async (date) => {
            let userId = state.userId
            let token = state.token
            // await dispatch(getAssignmentsByUser(userId, token));
            // ds = populateAssignment(assignments, true);
            // callme(date);
            // setSelectedDate(date)
            
            setSelectedDate(date)
          }}
          //onDateSelected={(selectedDate) => alert(JSON.stringify(selectedDate))}
          />
        </View>
        <Assignments
          sort={'hide'}
          counter={props.counter}
          selectedDate={selectedDate}
        />
        <Goals goals={goals.filter((x) => x.isArchived == false && x.isCompleted == false)} />
        <View style={{height: 90}}></View>

      </ScrollView>
    )
}

export default HomeScreen;