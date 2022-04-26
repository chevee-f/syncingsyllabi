import React, { useContext, useEffect } from 'react';
import { Text, View, ScrollView, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import label from '../../styles/label'
import color from '../../styles/colors'
import moment from 'moment';
import styles from './styles'
import Goals from '../Goal/Goals'
import method from './method'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalByUser } from '../../actions/goal';

const HomeScreen = ({ navigation }) => {

  const {
  } = method();

  let startingDate = moment().subtract(2, 'days');

  const { state } = useContext(AuthContext);
  const { goals } = useSelector(state => state.goalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
      let userId = state.userId
      let token = state.token
      dispatch(getGoalByUser(userId, token));
  }, [goals.length]);

    return (
      <View  style={styles.container}>
          <ScrollView>
              <View style={{margin:20}}>
                  <View style={styles.progressContainer}>
                      <Text style={[label.boldExtraSmallHeading,{color:color.primary}]}>SEMESTER PROGRESS</Text>
                      <Text style={[label.extraSmallHeading2,{color:color.primary}]}>26/45</Text>
                  </View>
                  
                  <ProgressBar progress={0.5} color={color.primary} />
                  <Text style={[label.boldExtraSmallHeading, styles.textPercentage]}>57% COMPLETE</Text>
              </View>
              <View>
              <CalendarStrip
                currentScreen={"Home"}
                scrollable
                selectedDate={moment()}
                numDaysInWeek={5}
                style={styles.calendar}
                calendarHeaderFormat='MMMM'
                calendarHeaderStyle={styles.calendarHeader}
                iconContainer={Platform.OS === "ios" ? {flex: 0.1} : {
                  width: 10,
                  height: 0,
                  overflow: 'hidden'
                }}
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
                //onDateSelected={(selectedDate) => alert(JSON.stringify(selectedDate))}
                />
              </View>
              <Goals goals={goals} />
        </ScrollView>
      </View>
    )
}

export default HomeScreen;