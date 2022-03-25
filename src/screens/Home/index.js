import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import label from '../../styles/label'
import color from '../../styles/colors'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import styles from './styles'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import Goals from '../Goal/Goals'

const HomeScreen = ({ navigation }) => {

  const { state } = React.useContext(AuthContext);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    fetchUser();
  }, []);

  const [goals, setGoals] = React.useState([
      {
          goal: "Get an A for IS Exam!",
          dateTime: "Due Tomorrow at 10:00am",
          isDue: true
      },
      {
          goal: "Get an A for IS Exam!",
          dateTime: "10-29-2021  |  1:00 PM",
          isDue: false
      },
      {
          goal: "Get an A for IS Exam!",
          dateTime: "10-29-2021  |  1:00 PM",
          isDue: false
      }
  ]);

  let startingDate = moment().subtract(2, 'days');
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
                iconContainer={{flex: 0.1}}
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
                />
              </View>
              <Goals goals={goals} />
              <View>
                  <Text>{//user.email
                  }</Text>
              </View>
        </ScrollView>
      </View>
    )
}

export default HomeScreen;