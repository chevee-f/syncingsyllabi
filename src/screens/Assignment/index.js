import React from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, Picker } from 'react-native';
import Card from '../../components/Card';
import CalendarStrip from 'react-native-calendar-strip';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AssignmentScreen = () => {
  const [selectedDate, setSelectedDate] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(false);

  const [value, setValue] = React.useState('duedate');
  const [isFocus, setIsFocus] = React.useState(false);

  let fetchedDates = ["2022-02-25"];
  let markedDatesArray = [];

  const data1 = {
    '2012-05-22': [
      {name: 'MKTG 100S1', due: 'Due Tomorrow at 10:00am'}, 
      {name: 'CS111', due: 'Due Tomorrow at 10:00am'}
    ]
  };

  const data = [
    {
      class: 'MKTG 10',
      due: "09:00am",
      isDue: false
    },{
      class: 'CS 111',
      due: "10:00am",
      isDue: false
    },{
      class: 'MKTG',
      due: "Due Tomorrow at 11:00am",
      isDue: true
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

  const renderItem = (item) => {
    return (
      <View style={{ padding: 15}}>
        <Text style={{ color: '#0036A1', fontWeight: 'bold'}}>{item.label}</Text>
      </View>
    );
  };
  
  const sortData = [
    { label: 'Due Date', value: 'duedate' },
    { label: 'Class', value: 'class' },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={{
          backgroundColor: 'white',
          height: 190,
          width: Dimensions.get("window").width,
          position: 'absolute',
          top: 0,
        }}></View>
        <View style={{
          backgroundColor: '#0036A1',
          height: 100,
          width: Dimensions.get("window").width,
          position: 'absolute',
          top: 0,
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13
        }}>
          <Text style={{ textAlign: 'center', color: 'white', marginTop: 18, fontSize: 18, fontWeight: 'bold'}}>Assignments</Text>
        </View>
        <CalendarStrip
          currentScreen={"Home"}
          scrollable
          selectedDate={'2022-02-25'}
          style={{height: 80, marginTop: 110, paddingBottom: 10, overflow: 'visible'}}
          calendarHeaderStyle={{color: 'white', marginBottom: 30, position: 'absolute', left: 15, top: -45, fontSize: 16, fontWeight: '100'}}
          iconContainer={{flex: 0.1}}
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{type: 'background', duration: 200, highlightColor: 'black'}}
          markedDates={markedDatesArray}
          markedDatesStyle={{ top: 10, bottom: 0}}
          weekendDateNameStyle={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#0036A1'
          }}
          weekendDateNumberStyle={{
            color: 'black',
            top: 14
          }}
          dateNumberStyle={{ // day number
            color: 'black',
            top: 14
          }}
          dateNameStyle={{ // day name
            fontSize: 12,
            fontWeight: 'bold',
            color: '#0036A1'
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
              setValue(item.value);
              setIsFocus(false);
            }}
            maxHeight={100}
          />
        </View>
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
  container: { flex: 1, marginTop: 24 },
  sortContainer: {
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 20,
    width: 150,
    marginTop: 20
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
});

export default AssignmentScreen;