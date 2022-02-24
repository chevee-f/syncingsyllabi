import React from 'react';
import { StyleSheet, Dimensions, Platform, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import label from './../styles/label'
import color from './../styles/colors'
import moment from 'moment';

var {height, width} = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

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

const styles = StyleSheet.create({
  progressContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:5
  },
  textPercentage:{
    color:color.primary,
    alignSelf:'flex-end',
    marginTop:5
  },
  calendarStyle:{
    height: Platform.OS === 'ios' ? height * 0.15 : height * 0.2,
    marginHorizontal:15
  },
  calendarHeaderStyle:{
    color: color.primary,
    fontFamily:'Manrope',
    fontSize:23,
    marginLeft:5,
    marginBottom:15,
    alignSelf:'flex-start'
  },
  dateNumberStyle:{
    color: color.primary,
    fontFamily:'Manrope',
    fontSize:24
  },
  dayContainerStyle:{
    backgroundColor:color.primaryLight,
    borderRadius:15,
    paddingTop:15
  },
  highlightDateNameStyle:{
    color:color.textDefault,
    marginBottom:-50
  },
  highlightDateNumberStyle:{
    color:color.textDefault,
    fontFamily:'Manrope',
    fontSize:24
  },
  highlightDateContainerStyle:{
    backgroundColor:color.primary,
    borderRadius:15,
    width:65,
    paddingTop:15
  }
});

export default HomeScreen;