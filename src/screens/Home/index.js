import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import label from '../../styles/label'
import color from '../../styles/colors'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/user';
import styles from './styles'

const HomeScreen = ({ navigation }) => {

  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    fetchUser();
  }, []);

  let startingDate = moment().subtract(2, 'days');
    return (
      <View style={{ flex:1 }}>
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
          />
        </View>
        
      </View>
    )
}

export default HomeScreen;