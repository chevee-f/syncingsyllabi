import React from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Card from '../../components/Card';
import CalendarStrip from 'react-native-calendar-strip';

const AssignmentScreen = () => {
  const [selectedDate, setSelectedDate] = React.useState(false);
  let fetchedDates = ["2022-02-25","2022-02-26","2022-02-27","2022-02-28",];
  let markedDatesArray = [];

  const data1 = {
    '2012-05-22': [
      {name: 'MKTG 100S1', due: 'Due Tomorrow at 10:00am'}, 
      {name: 'CS111', due: 'Due Tomorrow at 10:00am'}
    ]
  };

  const data = [
    {
      class: 'MKTG we',
      due: "somebody once told me"
    },{
      class: 'MKTG we',
      due: "somebody once told me"
    },{
      class: 'MKTG we',
      due: "somebody once told me"
    },
  ];

  for (let i = 0; i < fetchedDates.length; i++) {
    markedDatesArray.push({
      date: fetchedDates[i],
      dots: [
        {
          color: '#70C862', 
        },
        {
          color: '#70C862', 
        },
        {
          color: '#70C862', 
        },
      ],
    });
  }

  return (
    <>
      <View style={styles.container}>
        <CalendarStrip
          scrollable
          selectedDate={'2022-02-25'}
          style={{height: 150, paddingTop: 20, paddingBottom: 10}}
          calendarColor={'white'}
          calendarHeaderStyle={{color: 'black'}}
          dateNumberStyle={{color: 'black'}}
          iconContainer={{flex: 0.1}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{type: 'background', duration: 200, highlightColor: 'black'}}
          markedDates={markedDatesArray}
          markedDatesStyle={{ top: 10, bottom: 0}}
          highlightDateNumberStyle={{  // selected day
            top: 19
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

        <Card data={data} />
      </View>
    {/* <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
      <Text>Assignment Screen</Text>
      <Card />
    </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 24 }
});

export default AssignmentScreen;