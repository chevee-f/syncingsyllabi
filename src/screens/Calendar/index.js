import React from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import Card from '../../components/Card';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const vacation = {key: 'vacation', color: '#70C862'};
  const massage = {key: 'massage', color: '#70C862'};
  const workout = {key: 'workout', color: '#70C862'};
    return (
      <View style={{ flex:1, alignItems:'center',justifyContent:'center', top: 24 }}>
        <Agenda
  items={{
    '2012-05-22': [{name: 'MKTG 100S1', due: 'Due Tomorrow at 10:00am'}, {name: 'CS111', due: 'Due Tomorrow at 10:00am'}]
  }}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={month => {
    console.log('trigger items loading ');
  }}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
  }}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={day => {
    console.log('day changed');
  }}
  // Initially selected day
  selected={'2012-05-22'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <View />;
  }}

  displayLoadingIndicator
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  renderDay={(day, item) => {
    let name = '';
    let date = '';
  
    const data = [
      {
        class: item.name,
        due: item.due
      },
    ];

    if(item !== undefined)
      name = item.name;

    if(day !== undefined)
      date = day;

    return <View style={{ width: '100%' }}><Card data={data} /></View>;
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
    return <View><Text>Empty Data</Text></View>;
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
  markedDates={{
    '2012-05-22': {
      dots: [vacation, massage, workout], 
      selectedColor: '#0036A1',
      customStyles: {
        container: {
          height: 30,
          width: 30
        },
        text: {
          color: 'white',
          fontSize: 15
        }
      }
    },
    '2012-05-23': {dots: [vacation, massage], selectedColor: '#0036A1'},
  }}
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
    dotStyle: {
      marginTop: 10,
      color: 'black'
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
      },
    }
  }}
  // Agenda container style
  style={{ }}
/>
      </View>
    )
}

export default CalendarScreen;