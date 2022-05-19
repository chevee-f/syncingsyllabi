import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Card from '../../components/Card';
import { ActivityIndicator } from 'react-native-paper';

import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignmentsByUser } from '../../actions/assignments';
import method from './method';
import Moment from 'moment';
import { TextInput } from 'react-native-paper';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import Label from '../../components/Label';
import AddItem from '../../components/AddItem';
import color from '../../styles/colors';
import ConfirmationModal from '../../components/ConfirmationModal';
import SuccessModal from '../../components/SuccessModal';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const vacation = {key: 'vacation', color: '#70C862'};
  const massage = {key: 'massage', color: '#70C862'};
  const workout = {key: 'workout', color: '#70C862'};

  const { state } = useContext(AuthContext);
  const { assignments } = useSelector(state => state.assignmentsReducer);
  const [note, setNote] = useState('');
  const [attachmentsVisible, setAttachmentsVisible] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState("");
  const [titleHasError, setTitleHasError] = useState(false);
  const [duedateHasError, setDuedateHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [item, setItem] = useState();

  const {
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
  } = method();

  const dispatch = useDispatch();
  let fetchedDates = [];
  useEffect(() => {
    let userId = state.userId
    let token = state.token
    dispatch(getAssignmentsByUser(userId, token));
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
      let tmpds = {};
      for(let i = 0; i < dates.length; i++) {
        let newArr = assignments.filter(x => x.assignmentDateEnd.split("T")[0] === dates[i]);
        let dots = [];
        let newArrCount = newArr.length;// > 3 ? 3 : newArr.length;
        for(let j = 0; j < newArrCount; j++) {
          dots.push({
            key: 'item' + i + j,
            color: '#70C862'
          })
        }

        tmpds[dates[i]] = {
          dots: dots,
          selectedColor: '#0036A1',
          customStyles: {
            container: {
              height: 30,
              width: 30
            },
            text: {
              fontSize: 15
            }
          } //data: newArr
          ,data: newArr
        };
        fetchedDates.push({date: dates[i], dots: dots, data: newArr});
      }
      console.log(tmpds);
      setMarkedDatesArray(tmpds);
      // let ds = [];
      // for (let i = 0; i < fetchedDates.length; i++) {
      //   ds.push({
      //     date: fetchedDates[i].date,
      //     dots: fetchedDates[i].dots,
      //     data: fetchedDates[i].data
      //   });
      // }
      // setMarkedDatesArray(ds);
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
    }
  }, [assignments.length]);
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
  
  const toggleAttachments = (notes) => {
    setNote(notes);
    setAttachmentsVisible(!attachmentsVisible);
  }
  
  const editCardData = (res) => {
    toggleModal();
    setClassAssignments({...classAssignments, 
      id: res.id, 
      title: res.assignmentTitle, 
      dueDate: res.assignmentDateEnd, 
      notes: res.notes 
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
    return (
      <View style={{ flex:1, alignItems:'center',justifyContent:'center' }}>       
      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={false}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
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
            height: 310,
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
                  }}>Attachments {attachmentsVisible}</Text>
                  <TextInput 
                    multiline
                    disabled={true}
                    numberOfLines={8}
                    style={{
                      backgroundColor: '#FAF6EA', 
                      marginTop: 10, 
                      marginBottom: 24, 
                      paddingTop: 10,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10
                    }}
                    value={note}
                  />
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
      <View>
      
<Agenda
  // items={{
  //   '2012-05-22': [{name: 'item 1 - any js object'}],
  //   '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
  //   '2012-05-24': [],
  //   '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  // }}
  // items={{
  //   "2022-05-22": [{name: 'item 1 - any js object'}],
  // }}
  items={cardData}
  // items={{
  //   "2022-04-29": [{"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "New Assignment 1", "notes": "My Note 29th"}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "CSS 1", "notes": ""}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "123", "notes": ""}, {"assignmentDateEnd": "2022-04-29T00:00:00", "assignmentTitle": "zxc", "notes": ""}], 
  //   "2022-05-25": [{"assignmentDateEnd": "2022-05-25T00:00:00", "assignmentTitle": "Moin", "notes": "My Noteasd"}]
  // }}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={month => {
    console.log('trigger items loading ' + month);
  }}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log(day.dateString);
    
    console.log("=============calendar=============1");
    callme(day.dateString)
  }}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={day => {
    console.log('day changed');
  }}
  // Initially selected day
  selected={selectedDate}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2001-01-01'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2050-12-32'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <View><Text>Hello</Text></View>;
  }}

  displayLoadingIndicator
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  renderDay={(day, item) => {
    let name = '';
    let date = '';
    console.log("***************renderday")
    
    console.log(item)
    console.log(day)
    const data = [
      {
        assignmentTitle: item.assignmentTitle,
        assignmentDateEnd: item.assignmentDateEnd,
        notes: item.notes
      },
    ];

    // if(item !== undefined)
    //   name = item.name;

    // if(day !== undefined)
    //   date = day;
    // console.log(item)

    return <View style={{ width: '100%' }}>
      <Card 
          showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
          editCardData={editCardData} 
          completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
          onPress={toggleModal} 
          toggleAttachments={toggleAttachments}
          data={data} />
    </View>;
  }}
  // Specify how empty date content with no items should be rendered
  renderEmptyDate={() => {
    return <View><Text>Empty Date</Text></View>;
  }}
  // Specify how agenda knob should look like
  renderKnob={() => {
    return  <View>
              <Image 
                  source={require('../../assets/icons/CaretUp.png')}
                  resizeMode='contain'
                  style={{
                    width:24,
                    height:24,
                    marginTop: -4
                }}
              />
            </View>;
  }}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData={() => {
    return <View style={{flex: 1, width: Dimensions.get("window").width }}><View style={{ 
      flex: 1,
      alignItems: 'center', 
      marginTop: 50, 
      width: '100%' }}>
      <Text style={{ color: '#959595'}}>No Assignments</Text>
    </View></View>;
  }}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {
    return r1.text !== r2.text;
  }}
  // Hide knob button. Default = false
  hideKnob={false}
  // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
  showClosingKnob={true}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  markingType={'multi-dot'}
  markedDates={markedDatesArray}
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
  refreshControl={null}
  // Agenda theme
  theme={{
    agendaDayTextColor: 'red',
    agendaTodayColor: 'red',
    agendaKnobColor: 'red',
    textDayFontSize: 15,
    textDisabledColor: 'black',
    selectedDayBackgroundColor: '#0036A1',
    dotStyle: {
      marginTop: 10
    },
    'stylesheet.dot': {
      selectedDot: {
        marginTop: 10
      }
    },
    'stylesheet.agenda.main': {
      knobContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        height: 15,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'white'
      },
      weekday: {
        width: 32,
        textAlign: 'center',
        color: '#0036A1',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
    }
  }}
  // Agenda container style
  style={{  }}
/>
<SuccessModal 
        successModalVisible={successModalVisible} 
        successMessage={successMessage}
        headerText={successTitle}
        onClose={() => {
          setSuccessModalVisible(!successModalVisible);
          callme(selectedDate)
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
  }
})
export default CalendarScreen;