import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
import { getSyllabusByUser } from '../../actions/syllabus';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FilePickerManager from 'react-native-file-picker';

const HomeScreen = (props) => {
  const {
    cardData,
    selectedDate,
    markedDatesArray,
    setCardData,
    setSelectedDate,
    setMarkedDatesArray,
    callme
  } = method();

  let startingDate = moment().subtract(2, 'days');

  const { state } = useContext(AuthContext);
  const { goals } = useSelector(state => state.goalReducer);
  const { assignments } = useSelector(state => state.assignmentsReducer);
  const { syllabus } = useSelector(state => state.syllabusReducer);

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
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("home useeffect in act *************************")
      let userId = state.userId
      let token = state.token
      dispatch(getAssignmentsByUser(userId, token));
      dispatch(getGoalByUser(userId, token));
      // dispatch(getSyllabusByUser(userId, token));
      populateAssignment(assignments);
  }, [assignments.length, goals.length]);

  useEffect(() => {
    ds = populateAssignment(assignments, true);
    callme(selectedDate, ds);
  }, [props.counter])
  let fetchedDates = [];
  const populateAssignment = (assignments, isClick = false) => {
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
                calendarHeaderStyle={[styles.calendarHeader, {color:state.isDarkTheme === 'true' ? color.default : color.primary}]}
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
                  await dispatch(getAssignmentsByUser(userId, token));
                  ds = populateAssignment(assignments, true);
                  callme(date, ds);
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
                  // showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
                  // editCardData={editCardData} 
                  // completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
                  // onPress={toggleModal} 
                  // toggleAttachments={toggleAttachments}
                  // page={'home'}
                  // data={cardData} />
                  // <Card 
                    // showRemoveModal={(item, message, status) => openConfirmationModal(item, message, status)} 
                    // editCardData={editCardData} 
                    // completeCardData={(item, message, status) => openConfirmationModal(item, message, status)}
                    // onPress={toggleModal} 
                    // toggleAttachments={toggleAttachments}
                    page={'home'}
                    selectedDate={selectedDate}
                    markedDatesArray={markedDatesArray}
                    // allDatesArray={allDatesArray}
                    // isShowAll={isShowAll}
                    data={cardData}
                    syllabus={syllabus}
                    bgColor={bgColor} />
              </View>
        </ScrollView>
      </View>
    )
}

export default HomeScreen;