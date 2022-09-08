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

  // const useEffectFunction = (status = "") => {
  //   fetchedDates = [];
  //   if(assignments.length > 0) {
  //     let dates = [];
  //     for(let i = 0; i < assignments.length; i++) {
  //       let thedate = assignments[i]["assignmentDateEnd"].split("T")[0];
  //       if(dates.indexOf(thedate) < 0) {
  //         dates.push(thedate);
  //       }
  //     }
  //     dates = dates.sort();
  //     let tmpds = {};
  //     for(let i = 0; i < dates.length; i++) {
  //       let newArr = assignments.filter(x => x.assignmentDateEnd.split("T")[0] === dates[i]);
  //       let dots = [];
  //       let newArrCount = newArr.length;// > 3 ? 3 : newArr.length;
        
  //       // for(let j = 0; j < newArrCount; j++) {
  //       let j = 0;
  //       for (let assignment of newArr) {
  //         let color = '#000';
  //         for (let syllabi of syllabus) {
  //           if (syllabi.id == assignment.syllabusId) {
  //             color = bgColor[syllabi.colorInHex][1]
  //           }
  //         }
  //         dots.push({
  //           key: 'item' + i + j,
  //           color: color
  //         });
  //         j++;
  //       }

  //       tmpds[dates[i]] = {
  //         dots: dots,
  //         selectedColor: '#0036A1',
  //         customStyles: {
  //           container: {
  //             height: 30,
  //             width: 30
  //           },
  //           text: {
  //             fontSize: 15
  //           }
  //         } //data: newArr
  //         ,data: newArr
  //       };
  //       fetchedDates.push({date: dates[i], dots: dots, data: newArr});
  //     }
  //     console.log(tmpds);
  //     setMarkedDatesArray(tmpds);
  //     let ds = [];
  //     for (let i = 0; i < fetchedDates.length; i++) {
  //       ds.push({
  //         date: fetchedDates[i].date,
  //         dots: fetchedDates[i].dots,
  //         data: fetchedDates[i].data
  //       });
  //     }
  //     setStripMarkedDatesArray(ds);
  //     const d = new Date();
  //     let m = (d.getMonth()+1);
  //     if(m.toString().length === 1) {
  //       m = "0" + m;
  //     }
  //     let dt = d.getDate();
  //     if(dt.toString().length === 1) {
  //       dt = "0" + dt;
  //     }
  //     let selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
  //     let hasData = false;
  //     console.log("fetchedDates")
  //     console.log(fetchedDates)
  //     console.log("selectedDateY")
  //     console.log(selectedDateY)
  //     for (let i = 0; i < fetchedDates.length; i++) {
  //       if(selectedDateY === fetchedDates[i].date && !hasData) {
  //         // console.log("fetchedDates[i].data")
  //         // console.log(fetchedDates[i].data)
  //         hasData = true;
  //         setCardData(fetchedDates[i].data);
  //       }
  //     }

  //     if(!hasData) {
  //       setCardData([]);
  //     } 
  //     if(status === "success") {
  //       callme(selectedDate, ds)
  //     }
  //   }
  // }
  /*
    '2012-05-22': {
      dots: [vacation, massage, workout], 
      selectedColor: '#0036A1',
      customStyles: {
        container: {
          height: 30,
          width: 30
        },
        text: {
          fontSize: 15
        }
      }
    }
  */
    let test = {
        '2012-05-22': {
        dots: [vacation, massage, workout], 
        selectedColor: '#0036A1',
        customStyles: {
            container: {
            height: 30,
            width: 30
            },
            text: {
            fontSize: 15
            }
        }
        },
        '2012-05-23': {dots: [vacation, massage], selectedColor: '#0036A1'},
    };
  
    const editCardData = (res) => {
        toggleModal();
        setClassAssignments({...classAssignments, 
        id: res.id, 
        title: res.assignmentTitle, 
        dueDate: res.assignmentDateEnd, 
        notes: res.notes, 
        syllabusId: res.syllabusId 
        });
    }

    const openConfirmationModal = (item, message = '', status = '') => {
        setItem(item);
        setConfirmationVisible(true);
        setConfirmationMessage(message);
        setConfirmationStatus(status);
    }

    const saveAssignment = () => {
        if(classAssignments.dueDate !== "" && classAssignments.title !== "") {
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
        }
    }
    const renderItem = (item) => {
        return (
        <View style={{ padding: 15}}>
            <Text style={{ color: '#0036A1', fontWeight: 'bold'}}>{item.label}</Text>
        </View>
        );
    };

    const sortData = [
        { label: 'Class', value: 'id' },
        { label: 'Due Date', value: 'assignmentDateEnd' },
        { label: 'Title', value: 'assignmentTitle' },
    ];

    const calendarHeightInc = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(heightAnim, {
            toValue: Dimensions.get("window").height - 200,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const calendarHeightDec = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(heightAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

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
                console.log(attachmentUrl)
                setIsAttachmentVisible(!isAttachmentVisible)
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
    // console.log(markedDatesArray)
    // console.log(calendarMarkedDatesArray)
    return (
        <View style={{ flex:1, }}>
            <Modal 
                isVisible={isModalVisible} 
                style={{
                    margin: 0,
                    justifyContent: 'flex-end'
                }} 
                onBackdropPress={toggleModal} 
                transparent={true} 
                animationInTiming={500}
                animationOutTiming={1000}
                backdropOpacity={0.4}
                // propagateSwipe={true}
            >
                <View style={{
                    height: '66%',
                    marginTop: 'auto',
                    backgroundColor:'white',
                    position: 'relative',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16
                }}>
                    <TouchableOpacity 
                        onPress={toggleModal}
                    >
                        <Image 
                            source={require('../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close} />
                    </TouchableOpacity>
                    <ScrollView style={{ }}>
                        <View style={{ marginHorizontal: 13 }}>
                            <View style={{marginTop: 24}}>
                                <Label text="Title *" />
                                <DefaultInput 
                                    label="Title"
                                    // value={title}
                                    value={classAssignments.title}
                                    onChangeText={(title) => {
                                        setClassAssignments({...classAssignments, title: title})
                                        if(title != "")
                                        setTitleHasError(false);
                                    }}
                                    hasError={titleHasError}
                                />
                            </View>
                            <View style={{marginTop: 24}}>
                                <Label text="Select Class" />
                                <View style={{flexDirection:'row'}}>
                                    <AddItem onPress={() => setModalVisible(true)} />
                                    {
                                    // classSyllabi.map((item) => {
                                    //         return (
                                    //             <GradientItem 
                                    //                 code={item.code}
                                    //                 name={item.name}
                                    //                 schedule={item.schedule}
                                    //             />
                                    //         );
                                    //     })                
                                    }
                                </View>
                            </View>
                            <View style={{marginTop: 24, width: '49%'}}>
                                <Label text="Due date *" />
                                <TouchableOpacity activeOpacity={1.0} onPress={() => setCalendarVisible(true)}>
                                <View style={[styles.inputContainer, {borderColor: !duedateHasError ? color.default : 'red'}]}>
                                    <TextInput
                                        mode="flat"
                                        style={[styles.input]}
                                        placeholder="DD/MM/YYYY"
                                        value={classAssignments.dueDate}
                                        editable={false}
                                        selectionColor={color.primary}
                                        activeUnderlineColor={color.primary}
                                        theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                    />
                                </View>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{marginTop: 24, width: '49%'}}>
                            <Label text="Reminder" />
                                <View style={[styles.inputContainer, {borderColor: color.default}]}>
                                <TextInput
                                    mode="flat"
                                    style={[styles.input]}
                                    onPress={() => { setCalendarVisible(true)}}
                                    onPressIn={() => { setCalendarVisible(true)}}
                                    label="DD/MM/YYYY"
                                    editable={false}
                                    selectionColor={color.primary}
                                    activeUnderlineColor={color.primary}
                                    theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                />
                                </View> 
                            </View> */}
                            <View style={{marginTop: 24}}>
                                <Label text="Note" />
                                <TextInput 
                                    multiline
                                    numberOfLines={8}
                                    style={{backgroundColor: '#FAF6EA', marginTop: 10, marginBottom: 24, paddingTop: 10}}
                                    value={classAssignments.notes}
                                    onChangeText={(notes) =>  setClassAssignments({...classAssignments, notes: notes})}
                                />
                            </View>
                            {/* <View style={{marginTop: 24}}>
                                <Label text="Attachments" />
                                <DefaultInput 
                                    label="Title"
                                    editable={false}
                                />
                            </View> */}
                            <View style={{ marginBottom: 24, display: errorMessage? 'flex': 'none' }}>
                                <Text style={{ fontStyle: 'italic', color: 'red'}}>Please fill in all the required(*) fields.</Text>
                            </View>
                            <DefaultButton 
                                title="Save" 
                                onPress={saveAssignment}
                                style={{ marginBottom: 10 }}
                            /> 
                            <View style={{marginTop: 24}}></View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Modal 
          isVisible={attachmentsVisible} 
          style={{
            margin: 0
          }} 
          transparent={true} 
          animationInTiming={500}
          animationOutTiming={1000}
          backdropOpacity={0.4}
          onBackdropPress={() => setAttachmentsVisible(!attachmentsVisible)} 
          >
            <View style={{
            height: attachments != '' ? 310 : 250,
            backgroundColor:'white',
            position: 'relative',
            borderRadius: 16,
            width: Dimensions.get("window").width - 40,
            marginHorizontal: 20
          }}>
              <View style={{ marginHorizontal: 13, marginTop: 12 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#0036A1'
                  }}>Attachments</Text>
                  <TextInput 
                    multiline
                    disabled={true}
                    numberOfLines={5}
                    style={{
                      backgroundColor: '#FAF6EA', 
                      marginTop: 10, 
                      marginBottom: 10, 
                      paddingTop: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}
                    value={note}
                  />
                    <View style={{ marginBottom: 10 }}>
                    {showAttachment(attachments, false)}</View>
                  <DefaultButton 
                    title="Close" 
                    style={{ marginBottom: 10 }}
                    buttonColor={{ 
                      backgroundColor: "#E6EAF2", 
                      borderColor: '#A6BEED',
                      borderWidth: 1
                    }}
                    textStyle={{ 
                      color: '#494AE2'
                    }}
                    onPress={() => setAttachmentsVisible(!attachmentsVisible)}
                  /> 
              </View>
            </View>
        </Modal>
        <Modal 
            isVisible={isAttachmentVisible} 
            onBackdropPress={() => setIsAttachmentVisible(!isAttachmentVisible)}
            transparent={true} 
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            backdropOpacity={0.4}
            style={{ marginVertical: 120, backgroundColor: 'white', padding: 15, borderRadius: 8, height: 550, flex: 0 }}>
            <WebView 
                style={{ }} 
                automaticallyAdjustContentInsets={false}
                source={{ uri: attachmentUrl }} />
            <View style={{ height: 15}}></View>
            <DefaultButton 
                    title="Close" 
                    style={{ }}
                    buttonColor={{ 
                      backgroundColor: "#E6EAF2", 
                      borderColor: '#A6BEED',
                      borderWidth: 1
                    }}
                    textStyle={{ 
                      color: '#494AE2'
                    }}
                    onPress={() => setIsAttachmentVisible(!isAttachmentVisible)}
                  /> 
        </Modal>
            { !calendarOpened && 
                <View style={{ 
                    width: '100%',
                    height: 80,
                    zIndex: 1,
                    backgroundColor: 'white'
                    }}>
                    <CalendarStrip
                        onDateSelected={callme}
                        scrollable
                        showWeek={isShowAll}
                        // scrollerPaging={true}
                        selectedDate={selectedDate}
                        style={isShowAll ? {
                            height: 0, 
                            marginTop: 100, 
                            paddingBottom: 0, 
                            overflow: 'visible'
                        } : {
                            height: 80, 
                            paddingBottom: 10, 
                            overflow: 'visible',
                            marginTop: 10
                        }}
                        calendarHeaderFormat={"MMMM YYYY"}
                        calendarHeaderContainerStyle={isShowAll ? {
                            marginTop: -35,
                            left: 15,
                            position: 'absolute'
                        }: {
                            marginTop: -45,
                            left: 15,
                            position: 'absolute'
                        }}
                        calendarHeaderStyle={{
                            color: 'white',
                            fontSize: 16, 
                            fontWeight: '100'
                        }}
                        calendarHeaderClick={() => {
                            setAllCalendarVisible(true)
                        }}
                        iconContainer={{flex: 0.1}}
                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 200, highlightColor: 'black'}}
                        markedDates={markedDatesArray}
                        page={'assignment'}
                        markedDatesStyle={{ top: 10, bottom: 0}}
                        weekendDateNameStyle={styles.weekendDateNameStyle}
                        weekendDateNumberStyle={{
                            color: 'black',
                            top: 9,
                            marginBottom: -10
                        }}
                        dateNumberStyle={{ // day number
                            color: 'black',
                            top: 9,
                            marginBottom: -10
                        }}
                        dateNameStyle={{ // day name
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#0036A1',
                            top: -5
                        }}
                        dayContainerStyle={{
                            backgroundColor: 'white'
                        }}
                        highlightDateNumberStyle={{  // selected day
                            top: 19,
                            color: 'white'
                        }}
                        highlightDateNameStyle={{ // day name
                            fontSize: 12,
                            fontWeight: 'bold',
                            height: 20,
                            width: 100,
                            flex: 1,
                            position: 'absolute',
                            top: -25,
                            color: '#0036A1'
                        }}
                        highlightDateContainerStyle={{ // selected circle
                            position: 'absolute', 
                            top: 15,
                            justifyContent: 'flex-end', 
                            height: 30, 
                            width: 30,
                            backgroundColor: '#0036A1'
                        }}
                    /> 
                    {/* CalendarStrip End */}
                </View>
            }
            <View style={{ marginTop: 0 }}>
                    <View style={[{ 
                        width: Dimensions.get("window").width, 
                        backgroundColor: 'white',
                        paddingRight: 4,
                        shadowOpacity: 0,
                        shadowColor: 'black',
                        borderWidth: 0,
                        borderBottomWidth: 0
                    }, calendarOpened ? { 
                        // justifyContent: 'center',
                        alignItems: 'center',
                        height: 115,
                        backgroundColor: 'white', 
                        position: 'absolute', 
                        top: Dimensions.get("window").height - 210,
                        borderTopColor: 'rgba(193, 198, 206, 0.5)',
                        borderTopWidth: 1,
                        elevation: 1,
                    } : {
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 25, 
                        borderBottomColor: 'rgba(193, 198, 206, 0.5)',
                        borderBottomWidth: 1
                    }]}>
                        <TouchableOpacity onPress={() => { 
                            setCalendarOpened(!calendarOpened);
                            setShowCalendarList(!showCalendarList);
                            // if(!showCalendarList)
                            //     calendarHeightInc();
                            // else
                            //     calendarHeightDec();
                        }}>
                            <Image 
                                source={require('../../assets/icons/CaretUp.png')}
                                resizeMode='contain'
                                style={ calendarOpened && { transform: [{ rotate: "180deg" }] }} />
                        </TouchableOpacity>
                    </View>
            { showSort && 
                <View style={styles.sortContainer}>
                    <Text style={{position: 'absolute', top: 18, left: 20, color: '#A6BEED', fontWeight: 'bold'}}>Sort by</Text>
                    <Dropdown
                        renderItem={renderItem}
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        containerStyle={{marginTop: -40, marginLeft: 100, borderWidth: 1, borderRadius: 13}}
                        data={sortData}
                        labelField="label"
                        valueField="value"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            console.log("item");
                            console.log(item);
                            handleSortAssignment(item.value, selectedDate, isShowAll);
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        maxHeight={150}
                    />
                </View>
            }
                {/* <Animated.View
                    style={{
                            height: heightAnim
                        }}> */}
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
                            setShowCalendarList(!showCalendarList);
                            callme(date.dateString)
                        }}
                        markedDates={calendarMarkedDatesArray}
                        style={[{ }, !showCalendarList ? { height: 0 } : { height: Dimensions.get("window").height - 210 }] }
                    />
                {/* </Animated.View> */}
                <View style={{ 
                    // backgroundColor: 'red', 
                        width: '100%', 
                        height: 500
                    }}>
                    <Card 
                        showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
                        // editCardData={(res) => {
                        //   toggleModal();
                        //   setSyllabusId(res.syllabusId)
                        //   console.log(res)
                        //   let tempAtt = res.attachmentFileName;
                        //   if(tempAtt == null)
                        //     tempAtt = [];
                        //   setClassAssignments({...classAssignments, 
                        //     id: res.id, 
                        //     title: res.assignmentTitle, 
                        //     dueDate: res.assignmentDateEnd, 
                        //     notes: res.notes,
                        //     syllabusId: res.syllabusId,
                        //     attachments: res.attachment,
                        //     attachmentFileName: tempAtt
                        //   });
                        // }} 
                        toggleAttachments={toggleAttachments}
                        page={'home'}
                        selectedDate={selectedDate}
                        markedDatesArray={markedDatesArray}
                        // allDatesArray={allDatesArray}
                        // isShowAll={isShowAll}
                        data={cardData}
                        syllabus={syllabus}
                        bgColor={bgColor}
                    />
                </View>
                <View style={{ height: 100}}></View>
                <SuccessModal 
                    successModalVisible={successModalVisible} 
                    successMessage={successMessage}
                    headerText={successTitle}
                    onClose={() => {
                        setSuccessModalVisible(!successModalVisible);
                        useEffectFunction("success");
                    }}
                />

                <ConfirmationModal 
                    modalVisible={confirmationVisible} 
                    confirmationMessage={confirmationMessage}
                    status={confirmationStatus}
                    onClose={() => setConfirmationVisible(!confirmationVisible)}
                    onConfirm={() => {
                    if(confirmationStatus === 'remove')
                        handleDeleteAssignment(item);
                    if(confirmationStatus === 'complete')
                        handleCompleteAssignment(item);
                    }}
                />
            </View>
        </View>
    )
}

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
    }
})
export default CalendarScreen;