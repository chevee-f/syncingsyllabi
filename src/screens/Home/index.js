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

const HomeScreen = (props) => {
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
    console.log("home useeffect in act *************************")
      let userId = state.userId
      let token = state.token
      await dispatch(getAssignmentsByUser(userId, token));
      await dispatch(getGoalByUser(userId, token));
      // dispatch(getSyllabusByUser(userId, token));
      // console.log(assignments)
      // setTimeout(() => {
      //   populateAssignment(assignments);
      // }, 2000);
      // ds = populateAssignment(assignments, true);
      // console.log(selectedDate)
      // callme(selectedDate, ds)
  }, []);

  useEffect(() => {
    console.log("goals useeffect from home")
  }, [goals.length]);

  useEffect(() => {
    console.log("assignments useeffect from home");
    populateAssignment(assignments);
  }, [assignments.length]);

  useEffect(async() => {
    console.log("counter, populate assignments via HOME" + props.route)
    ds = populateAssignment(assignments, true);
    callme(selectedDate, ds);
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
      <View  style={styles.container}>
          <ScrollView>
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
                  callme(date);
                }}
                //onDateSelected={(selectedDate) => alert(JSON.stringify(selectedDate))}
                />
              </View>
              <Goals goals={goals.filter((x) => x.isArchived == false && x.isCompleted == false)} />
              {/* <TouchableOpacity onPress={() => {
                FilePickerManager.showFilePicker(null, (response) => {
                  console.log('Response = ', response);
                
                  if (response.didCancel) {
                    console.log('User cancelled file picker');
                  }
                  else if (response.error) {
                    console.log('FilePickerManager Error: ', response.error);
                  }
                  else {
                    setFile(response);
                  }
                });
              }}><Text>Open Dialogue</Text></TouchableOpacity> */}
              <View>
                <Card 
                    showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
                    editCardData={(res) => {
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
                    }} 
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

                  <SuccessModal 
                    successModalVisible={successModalVisible} 
                    successMessage={successMessage}
                    headerText={successTitle}
                    onClose={() => {
                      setSuccessModalVisible(!successModalVisible);
                      // useEffectFunction("success");
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
                                        code={item.className}
                                        name={item.teacherName}
                                        key={item.id}
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
              </View>
              <View style={{ height: 130}}></View>
        </ScrollView>
      </View>
    )
}

export default HomeScreen;