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
          style={{
            height: 80, 
            marginTop: 20,
            overflow: 'visible'
          }}
          calendarHeaderFormat='MMMM'
          calendarHeaderStyle={{
            color: '#0036A1', // dark blue
            position: 'absolute', 
            left: 20, 
            top: -35, 
            fontFamily:'Manrope',
            fontSize:23,
          }}
          iconContainer={{flex: 0.1}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          dateNumberStyle={{ // day number
            color: '#0036A1',
            top: -16, 
            fontFamily:'Manrope',
            fontWeight: 'normal',
            fontSize: 26,
          }}
          dateNameStyle={{ // day name
            color: 'black',
            top: 35,
            fontWeight: 'bold',
          }}
          weekendDateNumberStyle={{ // weekend day number
            color: '#0036A1',
            top: -16, 
            fontFamily:'Manrope',
            fontWeight: 'normal',
            fontSize: 26,
          }}
          weekendDateNameStyle={{ // weekend day name
            color: 'black',
            top: 35,
            fontWeight: 'bold',
          }}
          daySelectionAnimation={{
            type: 'background', 
            duration: 200}}
          // markedDates={markedDatesArray}
          markedDatesStyle={{ top: 10, bottom: 0}}
          highlightDateNumberStyle={{  // selected day number
            top: -32,
            fontSize: 26,
            fontWeight: 'normal',
            color: 'white'
          }}
          highlightDateNameStyle={{ // selected day name
            fontSize: 12,
            fontWeight: 'bold',
            height: 20,
            width: 100,
            flex: 1,
            position: 'absolute',
            top: 50,
            color: 'white'
          }}
          highlightDateContainerStyle={{ // selected circle
            // position: 'absolute', 
            top: -10,
            justifyContent: 'flex-end', 
            height: 80,
            width: 64,
            borderRadius: 16,
            backgroundColor: '#0036A1' //blue
          }}
        />
                  {/* <CalendarStrip
                    scrollable
                    style={styles.calendarStyle}
                    calendarHeaderStyle={styles.calendarHeaderStyle}
                    dateNumberStyle={styles.dateNumberStyle}
                    dateNameStyle={{color: color.primary,marginBottom:-50}}
                    selectedDate={moment()}
                    calendarHeaderFormat='MMMM'
                    dayContainerStyle	={styles.dayContainerStyle}
                    highlightDateNameStyle={styles.highlightDateNameStyle}
                    highlightDateNumberStyle={styles.highlightDateNumberStyle}
                    highlightDateContainerStyle={styles.highlightDateContainerStyle} 
                    upperCaseDays={false}
                    startingDate={startingDate}
                  /> */}
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