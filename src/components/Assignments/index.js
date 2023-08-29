import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import method from './method';
import Card from '../Card';
import Modal from "react-native-modal";
import Label from '../Label';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import SecondaryButton from '../../components/SecondaryButton';
import GradientItem from '../../components/GradientItem';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '../../components/DateTimePicker';
import { getAssignmentsByUser } from '../../actions/assignments';
import { getSyllabusByUser } from '../../actions/syllabus';
import color from '../../styles/colors';

import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import WeekdayTimePicker from '../../components/WeekdayTimePicker';
import Moment from 'moment';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';
import DocumentPicker, { types } from 'react-native-document-picker';
import { WebView } from 'react-native-webview';
import CalendarStrip from 'react-native-calendar-strip';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AssignmentModal from '../Assignments/Modal';
import NotAvailableModal from '../NotAvailableModal'

const Assignments = (props) => {
  const {
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
  } = method(props);

  const showAttachment = (tempAttach = '', isAdd = true) => {
    if(Array.isArray(attachments) && tempAttach == '') {
        if(attachments.length > 0)
            tempAttach = attachments[0].name
        else if(!Array.isArray(classAssignments.attachments))
            tempAttach = classAssignments.attachmentFileName
    }
    // console.log("tempAttach")
    // console.log(tempAttach);
    // console.log(classAssignments);
    if(tempAttach != '')
      return (
          <View style={{ marginVertical: 5, paddingHorizontal: 16, paddingVertical: 5, borderWidth: 1, borderStyle: "dashed", borderRadius: 16, width: "100%" }}>
            <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{ width: "85%" }} onPress={() => {
                // console.log(attachmentUrl.replace(/"/g, ""))
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
    else {
        if(isAdd) {
            return (
                <View>
                <Text style={{ marginTop: 10, marginBottom: 10, color: '#0036A1' }}>No Attachments</Text>
                <SecondaryButton onPress={handleAddFile} type='add-file' containerStyle={{ width: "100%" }} title="Add File" />
                </View>
            )
        }
    }
  }

  const showNotAvailableModal = () => {
    return (
      <Modal 
      isVisible={notAvailableModalVisible} 
      // isVisible={true} 
      style={{
        margin: 0
      }} 
      transparent={true} 
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.4}
      avoidKeyboard
      onBackdropPress={() => setNotAvailableModalVisible(false)} 
      >
      <View style={{
        paddingBottom: 15,
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
                color: '#0036A1',
                marginTop: 20,
                marginBottom: 20,
                marginHorizontal: 10
              }}>This feature is only available for Logged in users</Text>
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
                      onPress={() => setNotAvailableModalVisible(false)}
                    /> 
          </View>
      </View>
    </Modal>
    )
  }
  
  return (
    <View style={{}}>
      {props.screen == 'assignments' &&
      <TouchableOpacity onPress={() => {
        console.log('im pressed')
        toggleModal()
      }} style={{position: 'absolute', zIndex: 999, top: 23, right: 13}}><Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>+</Text></TouchableOpacity>
    }
      {/* <Text>{props.selectedDate.toString()}</Text> */}
      <View>
        {props.showWeek &&
          <CalendarStrip
              // ref={calendarRef}
              onDateSelected={callAssignmentsFromCurrentDate}
              scrollable
              showWeek={false}
              // scrollerPaging={true}
              selectedDate={props.selectedDate}
              style={{height: 80, marginTop: props.calendarOpened == undefined ? 110: 80,  paddingBottom: 10, paddingTop: 0, overflow: 'visible', backgroundColor: 'white'}}
              calendarHeaderFormat={"MMMM YYYY"}
              calendarHeaderContainerStyle={{
                marginTop: -45,
                left: 15,
                position: 'absolute'
              }}
              calendarHeaderStyle={{
                color: props.calendarOpened == undefined ? 'white': '#0036A1',
                fontSize: 16, 
                fontWeight: '400'
              }}
              calendarHeaderClick={() => {
                // setAllCalendarVisible(true)
              }}
              iconContainer={{flex: 0.1}}
              calendarAnimation={{type: 'sequence', duration: 30}}
              daySelectionAnimation={{type: 'background', duration: 200, highlightColor: 'black'}}
              // markedDates={[{'date': '2022-11-18', 'dots': [{'color': 'red'}, {'color': 'green'}]}]}
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
        }
        {props.calendarOpened != null &&
          <View style={[{ 
                        width: Dimensions.get("window").width, 
                        backgroundColor: 'white',
                        paddingRight: 4,
                        shadowOpacity: 0,
                        shadowColor: 'black',
                        borderWidth: 0,
                        borderBottomWidth: 0,
                        zIndex: 1
                    }, props.calendarOpened ? { 
                        // justifyContent: 'center',
                        alignItems: 'center',
                        height: 115,
                        backgroundColor: 'white', 
                        position: 'absolute', 
                        top: Dimensions.get("window").height - 210,
                        borderTopColor: 'rgba(193, 198, 206, 0.5)',
                        borderTopWidth: 1,
                        elevation: 1,
                        zIndex: 1
                    } : {
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 25, 
                        borderBottomColor: 'rgba(193, 198, 206, 0.5)',
                        borderBottomWidth: 1,
                        zIndex: 1,
                        marginTop: -10
                    }]}>
                        <TouchableOpacity onPress={() => { 
                            props.setCalendarOpened(!props.calendarOpened);
                            // setShowCalendarList(!showCalendarList);
                            // if(!showCalendarList)
                            //     calendarHeightInc();
                            // else
                            //     calendarHeightDec();
                        }}>
                            <Image 
                                source={require('../../assets/icons/CaretUp.png')}
                                resizeMode='contain'
                                style={ props.calendarOpened && { transform: [{ rotate: "180deg" }] }} />
                        </TouchableOpacity>
                    </View>
                  }
        </View>
      <View style={{
        //  flex: 1, 
         width: '100%',
         minHeight: 100
        }}>
          
        <Card 
            showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
            editCardData={editCardData} 
            // completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
            // onPress={toggleModal} 
            toggleAttachments={toggleAttachments}
            page={'assignments'}
            selectedDate={props.selectedDate}
            // markedDatesArray={markedDatesArray}
            // allDatesArray={allDatesArray}
            isShowAll={false}
            data={assignmentData}
            component={'assignments'}
            syllabus={syllabus}
            bgColor={bgColor}
            sort={props.sort} />
        </View>
        <NotAvailableModal
        isVisible={notAvailableModalVisible}
        onClose={() => {setNotAvailableModalVisible(false)}} />
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
        avoidKeyboard
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
                  {Platform.OS === 'android' ? 
                      <TouchableOpacity activeOpacity={1.0} onPress={() => setCalendarVisible(true)}>
                        <View style={[styles.inputContainer, {borderColor: !dueDateHasError ? color.default : 'red'}]}>
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
                      :
                      <DefaultInput 
                          label="Due date"
                          onPressIn={() => { setCalendarVisible(true)}}
                          editable={false}
                          value={classAssignments.dueDate}
                          hasValue={classAssignments.dueDate.length}
                      /> 
                  }
                  
                </View>
                <View style={{marginTop: 24}}>
                    <Label text="Notes" />
                    <TextInput 
                      multiline
                      mode="outlined"
                      outlineColor="#faf6ea"
                      style={{height: 200, backgroundColor: '#FAF6EA', marginTop: 10, marginBottom: 24, textAlignVertical: 'top', shadowColor: '#171717',
                      shadowOffset: {width: 0, height: 0},
                      shadowOpacity: 0.2,
                      shadowRadius: 3,}}
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
        <DateTimePicker 
          onClose={() => { setCalendarVisible(!calendarVisible); }}
          modalVisible={calendarVisible} 
          showTimePicker={true}
          time={classAssignments.dueDate ? classAssignments.dueDate : new Date()}
          onChangeDate={(startDate) =>  {
            setClassAssignments({...classAssignments, dueDate: Moment(startDate).format("MM/DD/YYYY") + " " + currentModalTime});
            setDueDateHasError(false);
            setErrorMessage(false);
          }}
          onChangeTime={(startDate) => {
            setCurrentModalTime(Moment(startDate).format("HH:mm"))
            setClassAssignments({...classAssignments, dueDate: Moment(startDate).format("MM/DD/YYYY HH:mm")});
            setDueDateHasError(false);
            setErrorMessage(false);
          }}
          selectedDate={classAssignments.dueDate ? classAssignments.dueDate : new Date()}
          onSelectDate={() => setCalendarVisible(!calendarVisible)} 
      />
        
        <NotAvailableModal
        isVisible={notAvailableModalVisible}
        onClose={() => {setNotAvailableModalVisible(false)}} />
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
          avoidKeyboard
          onBackdropPress={() => setAttachmentsVisible(!attachmentsVisible)} 
          >
            <View style={{
            paddingBottom: 15,
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
                      paddingTop: 0,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      textAlignVertical: 'top',
                      minHeight: 180
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
        onBackdropPress={() => setIsAttachmentVisible(false)}
        transparent={true} 
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.4}
        avoidKeyboard
        style={{
          margin: 0
        }} 
        >
          <View style={{
            paddingBottom: 15,
            backgroundColor:'white',
            position: 'relative',
            borderRadius: 16,
            width: Dimensions.get("window").width - 40,
            marginHorizontal: 20,
            height: Dimensions.get("window").height - 100,
            padding: 15
          }}>
        <WebView 
          style={{  }}
          automaticallyAdjustContentInsets={false}
          source={{ uri: attachmentUrl.replace(/"/g, "") }} 
          />
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
                onPress={() => setIsAttachmentVisible(false)}
              /> 
              </View>
      </Modal>
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
    </View>
  )
}
export default Assignments;