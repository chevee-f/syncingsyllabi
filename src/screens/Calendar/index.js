import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Modal from "react-native-modal";
import Card from '../../components/Card';
import { ActivityIndicator } from 'react-native-paper';

import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignmentsByUser } from '../../actions/assignments';
import { getSyllabusByUser } from '../../actions/syllabus';
import method from './method';
import Moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import Label from '../../components/Label';
import AddItem from '../../components/AddItem';
import color from '../../styles/colors';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import CalendarStrip from 'react-native-calendar-strip';
import { WebView } from 'react-native-webview';
import GradientItem from '../../components/GradientItem';
import DateTimePicker from '../../components/DateTimePicker';
import SecondaryButton from '../../components/SecondaryButton';
import Assignments from '../../components/Assignments';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = (props) => {
    const vacation = {key: 'vacation', color: '#70C862'};
    const massage = {key: 'massage', color: '#70C862'};
    const workout = {key: 'workout', color: '#70C862'};

    const { state } = useContext(AuthContext);
    const { assignments } = useSelector(state => state.assignmentsReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const [note, setNote] = useState('');
    const [attachmentsVisible, setAttachmentsVisible] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState("");
    const [titleHasError, setTitleHasError] = useState(false);
    const [duedateHasError, setDuedateHasError] = useState(false);
    const [classHasError, setClassHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [item, setItem] = useState();
    const [isFocus, setIsFocus] = React.useState(false);
    const [value, setValue] = React.useState('id');
    const [isShowAll, setIsShowAll] = useState(false);
    const [calendarOpened, setCalendarOpened] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showCalendarList, setShowCalendarList] = useState(false)
    const heightAnim = useRef(new Animated.Value(0)).current;
    const [attachments, setAttachments] = useState([]);
    const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
    const [attachmentUrl, setAttachmentUrl] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [chosenCalendarDate, setChosenCalendarDate] = useState(new Date())
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
    const {
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
        syllabusId,
        setSyllabusId,
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
    } = method();

    const dispatch = useDispatch();
    let fetchedDates = [];
    useEffect(async () => {
        console.log("USEEFFECT CALENDAR-------------------------")
        let userId = state.userId
        let token = state.token
        await dispatch(getAssignmentsByUser(userId, token));
        await dispatch(getSyllabusByUser(userId, token));
        useEffectFunction();
    }, []);

    useEffect(async() => {
      console.log("counter, populate assignments via CALENDAR------qwe-qwe-QWE-" + props.route)
      useEffectFunction("success");
    }, [props.counter]);


    return (
        <View style={{ flex: 1, marginTop: 24, marginBottom: 100 }}>
            <View style={isShowAll ? { } : {
          backgroundColor: 'white',
          height: 150,
          width: Dimensions.get("window").width,
          position: 'absolute',
          top: 0,
        }}></View>
        <View style={{
          backgroundColor: '#0036A1',
          height: Platform.OS === 'ios' ? 90 : 65,
          width: Dimensions.get("window").width,
          position: 'absolute',
          top: Platform.OS === 'ios' ? -25 : 0,
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13
        }}>
          <Text style={{ 
            textAlign: 'center', 
            color: 'white', 
            marginTop:  Platform.OS === 'ios' ? 55 : 18, 
            fontSize: 18, 
            fontFamily:'Manrope',
            fontWeight: 'bold',
            }}>Calendar</Text>
        </View>
                    <CalendarList
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={10}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={10}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={true}
                        collapsable={true}
                        markingType={'multi-dot'}
                        // selected={'2022-10-01'}
                        // initialDate={'2022-04-01'}
                        onDayPress={(date) => {
                            setCalendarOpened(!calendarOpened);
                            setChosenCalendarDate(date.dateString);
                            // setSelectedDate(date.dateString);
                            callme(date.dateString);
                            console.log("MOMENT DATE = " + Moment(date.dateString).format("YYYY-MM-DD"))
                            useEffectFunction("", Moment(date.dateString).format("YYYY-MM-DD"))
                            // setShowCalendarList(!showCalendarList);
                            // callme(date.dateString)
                        }}
                        markedDates={calendarMarkedDatesArray}
                        theme={{
                            selectedDayTextColor: 'red',
                            dotStyle: {
                                marginTop: 10,
                                color: 'green',
                                backgroundColor: 'green'
                            },
                            dotColor: 'red',
                            selectedDotColor: '#ffffff',
                            selectedDayTextColor: 'red'
                        }}
                        style={[{ }, !calendarOpened ? { height: 0 } : { height: Dimensions.get("window").height, marginTop: 70 }] }
                    />
                <Assignments 
                    counter={props.counter}
                    selectedDate={selectedDate}
                    showWeek={true}
                    calendarOpened={calendarOpened}
                    chosenCalendarDate={chosenCalendarDate}
                    setCalendarOpened={() => {
                        console.log("THE DATE IS " + selectedDate)
                        setCalendarOpened(!calendarOpened)
                    }} />
            
        </View>
    )
}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    sortContainer: {
        position: 'absolute',
        zIndex: 1,
        top: 105,
        left: 0
    },
    dropdown: {
        height: 50,
        paddingHorizontal: 20,
        width: 150,
        marginTop: 20,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0036A1'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    weekendDateNameStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0036A1',
        top: -5
    },
    inputContainer: {
      borderRadius: 4,
      height: height * 0.055,
      overflow: 'hidden',
      borderWidth:1,
      borderRadius:16,
      marginVertical:8
    },
    input: {
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: height * 0.063,
      overflow: 'hidden',
      backgroundColor: '#fbfbfb',
      paddingLeft:5,
      fontFamily: "Manrope",
      fontSize: height * 0.016,
      justifyContent:'center',
    },
    closeBtn: {
      zIndex: 999,
      alignSelf: 'flex-end',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      borderRadius: 100,
      backgroundColor: '#E6EAF2',
      marginTop: 13,
      marginRight: 13,
      marginBottom: 5
    },
    close:{
      alignSelf:'flex-end',
      marginTop: 13,
      marginRight: 13,
      marginBottom: 5
    },
})
export default CalendarScreen;