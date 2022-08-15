import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
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

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
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
    callme
  } = method();

  const dispatch = useDispatch();
  let fetchedDates = [];
  useEffect(() => {
    let userId = state.userId
    let token = state.token
    dispatch(getAssignmentsByUser(userId, token));
    dispatch(getSyllabusByUser(userId, token));
    useEffectFunction();
  }, []);

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
      let tmpds = {};
      for(let i = 0; i < dates.length; i++) {
        let newArr = assignments.filter(x => x.assignmentDateEnd.split("T")[0] === dates[i]);
        let dots = [];
        let newArrCount = newArr.length;// > 3 ? 3 : newArr.length;
        
        // for(let j = 0; j < newArrCount; j++) {
        let j = 0;
        for (let assignment of newArr) {
          let color = '#000';
          for (let syllabi of syllabus) {
            if (syllabi.id == assignment.syllabusId) {
              color = bgColor[syllabi.colorInHex][1]
            }
          }
          dots.push({
            key: 'item' + i + j,
            color: color
          });
          j++;
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
      let ds = [];
      for (let i = 0; i < fetchedDates.length; i++) {
        ds.push({
          date: fetchedDates[i].date,
          dots: fetchedDates[i].dots,
          data: fetchedDates[i].data
        });
      }
      setStripMarkedDatesArray(ds);
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
      console.log("fetchedDates")
      console.log(fetchedDates)
      console.log("selectedDateY")
      console.log(selectedDateY)
      for (let i = 0; i < fetchedDates.length; i++) {
        if(selectedDateY === fetchedDates[i].date && !hasData) {
          // console.log("fetchedDates[i].data")
          // console.log(fetchedDates[i].data)
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

      <View style={{ marginTop: 0}}>
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
<Agenda
  items={cardData}
  loadItemsForMonth={month => {
    console.log('trigger month items loading ' + month);
    console.log(month);
  }}
  onCalendarToggled={calendarOpened => {
    setCalendarOpened(calendarOpened);
    setShowSort(!calendarOpened);
  }}
  onDayPress={day => {
    console.log(day.dateString);
    
    console.log("=============calendar=============1");
    callme(day.dateString)
  }}
  onDayChange={day => {
    console.log('day changed');
  }}
  selected={selectedDate}
  minDate={'2001-01-01'}
  maxDate={'2050-12-32'}
  pastScrollRange={50}
  futureScrollRange={50}
  // renderItem={(item, firstItemInDay) => {
  //   console.log('rendering item')
  //   console.log(item)
  //   return <View style={{ width: '100%', height: 20, backgroundColor: 'red' }}><Text>Hello</Text></View>;
  // }}
  displayLoadingIndicator
  renderDay={(day, item) => {
    console.log("renderDay")
    // console.log(item)
    const data = [
      {
        assignmentTitle: item.assignmentTitle,
        assignmentDateEnd: item.assignmentDateEnd,
        notes: item.notes,
        syllabusId: item.syllabusId
      },
    ];
    setShowSort(true);
    return <View style={{ width: '100%' }}>
      <Card 
          showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
          editCardData={editCardData} 
          completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
          onPress={toggleModal} 
          toggleAttachments={toggleAttachments}
          page={'calendar'}
          data={data}
          syllabus={syllabus}
          bgColor={bgColor}
          />
          
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
    setShowSort(false)
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
        right: 5,
        height: 20,
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
  style={{ }}
/>
{ !calendarOpened && 
  <View style={{ 
    position: 'absolute',
    top: 5,
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
      markedDates={stripMarkedDatesArray}
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
  </View>
}
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
  }
})
export default CalendarScreen;