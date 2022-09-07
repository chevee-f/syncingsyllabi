import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, Picker, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Modal from "react-native-modal";
import Card from '../../components/Card';
import CalendarStrip from 'react-native-calendar-strip';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import SecondaryButton from '../../components/SecondaryButton'
import Label from '../../components/Label';
import AddItem from '../../components/AddItem';
import GradientItem from '../../components/GradientItem';
// import color from '../../../styles/colors';
import color from '../../styles/colors';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '../../components/DateTimePicker';
import { getAssignmentsByUser } from '../../actions/assignments';
import { getSyllabusByUser } from '../../actions/syllabus';

import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import method from './method';
import WeekdayTimePicker from '../../components/WeekdayTimePicker';
import Moment from 'moment';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import DocumentPicker, { types } from 'react-native-document-picker';
import { WebView } from 'react-native-webview';

var {height, width} = Dimensions.get('window');
const AssignmentScreen = (props) => {
  const [selectedValue, setSelectedValue] = React.useState(false);

  const [value, setValue] = React.useState('id');
  const [isFocus, setIsFocus] = React.useState(false);
  // const [hasData, setHasData] = React.useState(false);
  const calendarRef = useRef(null);
  const titleField = useRef(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [attachmentsVisible, setAttachmentsVisible] = useState(false);
  const [note, setNote] = useState('');
  const [allCalendarVisible, setAllCalendarVisible] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);

  const [title, setTitle] = useState("");
  
  const [item, setItem] = useState();

  const { state } = useContext(AuthContext);
  const [confirmationStatus, setConfirmationStatus] = useState("");
  const [titleHasError, setTitleHasError] = useState(false);
  const [duedateHasError, setDuedateHasError] = useState(false);
  const [classHasError, setClassHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isAwait, setIsAwait] = useState(0);
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [isAwait]);

  const {
    assignments,
    syllabus,
    fetchedDates,
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
    syllabusId,
    attachments,
    bgColor,
    setBgColor,
    setAttachments,
    setSyllabusId,
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
    callme,
    useEffectFunction
  } = method();

  useEffect(() => {
    let userId = state.userId
    let token = state.token
    dispatch(getAssignmentsByUser(userId, token));
    dispatch(getSyllabusByUser(userId, token));
    useEffectFunction();
  }, []);

  useEffect(() => {
    console.log("assignments useeffect from assignments-----------------------");
    useEffectFunction();
  }, [assignments.length]);

  useEffect(async() => {
    console.log("counter, populate assignments via assignments------asd-asd-asd-" + props.route)
    useEffectFunction();
  }, [props.counter]);

  let fetchedDates1 = [
    {
      date: "2022-04-06",
      data : [
        {
          id: '100',
          class: 'ACCOUNTING 101',
          due: "09:00am",
          color: '#70C862', 
          isDue: false
        },{
          id: '101',
          class: 'ALGEBRA',
          due: "10:00am",
          color: '#70C862', 
          isDue: false
        },{
          id: '102',
          class: 'PHYSICS',
          due: "Due Tomorrow at 11:00am",
          color: '#70C862', 
          isDue: true
        },
      ]
    },
    {
      date: "2022-04-07",
      data : [
        {
          id: '103',
          class: 'MKTG 10',
          due: "09:00am",
          color: '#70C862', 
          isDue: false
        },{
          id: '104',
          class: 'CS 111',
          due: "10:00am",
          color: '#70C862', 
          isDue: false
        },
      ]
    }
  ];

  // for (let i = 0; i < fetchedDates.length; i++) {
  //   markedDatesArray.push({
  //     date: fetchedDates[i].date,
  //     dots: fetchedDates[i].data,
  //   });
  // }

  const renderItem = (item) => {
    return (
      <View style={{ padding: 15}}>
        <Text style={{ color: '#0036A1', fontWeight: 'bold'}}>{item.label}</Text>
      </View>
    );
  };

  // const checkHasData = () => {
  //   return <Card cardD={getCardData} onPress={toggleModal} data={cardData} />;
  // }

  const handleCallback = async(id) => {
    setClassHasError(false)
    setSyllabusId(id);
    setClassAssignments({...classAssignments, syllabusId: id})
  }

  const sortData = [
    { label: 'Class', value: 'id' },
    { label: 'Due Date', value: 'assignmentDateEnd' },
    { label: 'Title', value: 'assignmentTitle' },
  ];
  
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
  }

  const openConfirmationModal = (item, message = '', status = '') => {
    setItem(item);
    setConfirmationVisible(true);
    setConfirmationMessage(message);
    setConfirmationStatus(status);
  }

  const showAllAssignments = async () => {
    console.log("showAllAssignments")
    let userId = state.userId
    let token = state.token
    await dispatch(getAssignmentsByUser(userId, token, '', true));
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
        let newArrCount = newArr.length > 3 ? 3 : newArr.length;
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
      let fd = [];
      for (let i = 0; i < fetchedDates.length; i++) {
          hasData = true;
          for(let j = 0; j < fetchedDates[i].data.length; j++)
            fd.push(fetchedDates[i].data[j]);
      }
      setCardData(fd);
      setIsShowAll(true);
      setAllDatesArray(fd);
    }
    setAllCalendarVisible(!allCalendarVisible);
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
    else {
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
                    setClassAssignments({...classAssignments, attachments: attachmentsArray[0], attachmentFileName: attachmentsArray[0].name})
                    setIsAwait(isAwait+1);
                }} type='add-file' containerStyle={{ width: "100%" }} title="Add File" />
                </View>
            )
        }
    }
  }
  
  return (
    <>
      <View style={styles.container}>
        <View style={isShowAll ? { } : {
          backgroundColor: 'white',
          height: 190,
          width: Dimensions.get("window").width,
          position: 'absolute',
          top: 0,
        }}></View>
        <View style={{
          backgroundColor: '#0036A1',
          height: Platform.OS === 'ios' ? 125 : 100,
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
            fontWeight: 'bold'
            }}>Assignments</Text>
        </View>
          <View
            style={{
              position: 'absolute', 
              top: Platform.OS === 'ios' ? 23 : 12, 
              right: 15
            }}
          >
          <TouchableOpacity onPress={toggleModal}><Text
            style={{
              color: 'white',
              fontSize: 25
            }}>+</Text>
            </TouchableOpacity></View>
        <CalendarStrip
          ref={calendarRef}
          onDateSelected={callme}
          scrollable
          showWeek={isShowAll}
          // scrollerPaging={true}
          selectedDate={selectedDate}
          style={isShowAll ? {height: 0, marginTop: 100, paddingBottom: 0, overflow: 'visible'} : {height: 80, marginTop: 110, paddingBottom: 10, overflow: 'visible'}}
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
          weekendDateNameStyle={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#0036A1',
            top: -5
          }}
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
            backgroundColor: '#0036A1' //blue
          }}
        />
        {/* <Button title="Show modal" onPress={toggleModal} /> */}
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
        <Modal 
          isVisible={isModalVisible} 
          style={{
            margin: 0,
            justifyContent: 'flex-end'
          }} 
          onBackdropPress={toggleModal} 
          transparent={true} 
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={0}
          backdropTransitionOutTiming={0}
          backdropOpacity={0.4}
          // propagateSwipe={true}
          >
          <DateTimePicker 
              onClose={() => { setCalendarVisible(!calendarVisible); }}
              modalVisible={calendarVisible} 
              showTimePicker={false}
              onChangeDate={(startDate) =>  {
                setClassAssignments({...classAssignments, dueDate: Moment(startDate).format("MM/DD/YYYY")});
                setDuedateHasError(false);
                setErrorMessage(false);
              }}
              onSelectDate={() => setCalendarVisible(!calendarVisible)}
          />
  
          {/* <DateTimePicker 
              onClose={() => { setAllCalendarVisible(!allCalendarVisible); }}
              modalVisible={allCalendarVisible} 
              showTimePicker={false}
              showAllAssignment={true}
              showAllAssignments={showAllAssignments}
              onChangeDate={(selectedDate) =>  {
                  setAllCalendarVisible(!allCalendarVisible);
                  setIsShowAll(false);
                  callme(selectedDate)
                  useEffectFunction();
              }}
              onSelectDate={{}}
          /> */}
          <View style={{
            height: '66%',
            marginTop: 'auto',
            backgroundColor:'white',
            position: 'relative',
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16
          }}>
          <TouchableOpacity 
            onPress={toggleModal}>
              <Image 
                  source={require('../../assets/icons/closeButton.png')}
                  resizeMode='contain'
                  style={styles.close}
              />
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
                    <Label text="Select Class *" />
                    <View style={{flexDirection:'row'}}>
                      <AddItem onPress={() => setModalVisible(true)} />
                      <ScrollView horizontal>
                        {syllabus.length > 0 &&
                          syllabus.map((item) => {
                            let isSelected = false;
                            if(item.id == syllabusId)
                              isSelected = true;
                            return (
                              <GradientItem 
                                parentCallback = {handleCallback}
                                key={item.id}
                                code={item.className}
                                name={item.teacherName}
                                schedule={!item.classSchedule ? '' : item.classSchedule.map(function(data){return data;}).join("|")}
                                selectedBgColor={bgColor[parseInt(item.colorInHex)]}
                                id={item.id}
                                isSelected={isSelected}
                              />
                            );
                        })}
                      </ScrollView>
                    </View>
                    {classHasError ? <Text style={{marginLeft: 7, marginTop: 5, color: 'red'}}>Please select a Class</Text> : null }
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
                  <View style={{marginTop: 14, marginBottom: 24}}>
                      <Label text="Attachments" />
                          {showAttachment()}
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
        {/* <WeekdayTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
                showTimePicker={true}
                title='Select day and time' 
                weekday={weekday}
                setWeekday={setWeekday}
                startTime={classAssignments.dueDate}
                onChangeStartTime={(startTime) =>  setClassAssignments({...classAssignments, dueDate: startTime})}
                onChangeEndTime={(endTime) =>  setClassAssignments({...classAssignments, dueDate: endTime})}
                endTime={classAssignments.dueDate}
                // list={classSyllabus.scheduleList}
                add={() => addSchedule()}
                // parentCallback = {handleCallback}
                // onSelectDate={() => setCalendarVisible(!calendarVisible)}
            /> */}
        {/* {checkHasData()} */}
        <Card 
          showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
          editCardData={editCardData} 
          completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
          onPress={toggleModal} 
          toggleAttachments={toggleAttachments}
          page={'assignments'}
          selectedDate={selectedDate}
          markedDatesArray={markedDatesArray}
          allDatesArray={allDatesArray}
          isShowAll={isShowAll}
          data={cardData}
          syllabus={syllabus}
          bgColor={bgColor} />
      </View>
    {/* <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
      <Text>Assignment Screen</Text>
      <Card />
    </View> */}

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
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 24, marginBottom: 100 },
  sortContainer: {
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 20,
    width: 150,
    marginTop: 20
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
});

export default AssignmentScreen;