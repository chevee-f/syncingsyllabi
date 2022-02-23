import React from 'react';
import { Dimensions, Platform, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import label from './../styles/label'
import color from './../styles/colors'
import moment from 'moment';

var {height, width} = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex:1 }}>
        <View style={{margin:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
             <Text style={[label.boldExtraSmallHeading,{color:color.primary}]}>SEMESTER PROGRESS</Text>
             <Text style={[label.extraSmallHeading2,{color:color.primary}]}>26/45</Text>
          </View>
          
          <ProgressBar progress={0.5} color={color.primary} />
          <Text style={[label.boldExtraSmallHeading,{color:color.primary,alignSelf:'flex-end',marginTop:5}]}>57% COMPLETE</Text>
        </View>
        <View>
          <CalendarStrip
            scrollable
            style={{height: Platform.OS === 'ios' ? height * 0.15 : height * 0.2,marginHorizontal:20}}
            calendarHeaderStyle={{color: color.primary,
                                  fontFamily:'Manrope',
                                  fontSize:24,
                                  marginLeft:5,
                                  marginBottom:15,
                                  alignSelf:'flex-start'}}
            dateNumberStyle={{color: color.primary,fontFamily:'Manrope',fontSize:24}}
            dateNameStyle={{color: color.primary,marginBottom:-50}}
            selectedDate={moment()}
            calendarHeaderFormat='MMMM'
            dayContainerStyle	={{backgroundColor:color.primaryLight,borderRadius:15,paddingTop:15}}
            highlightDateNameStyle={{color:color.textDefault,marginBottom:-50}}
            highlightDateNumberStyle={{color:color.textDefault,fontFamily:'Manrope',fontSize:24}}
            highlightDateContainerStyle={{backgroundColor:color.primary,borderRadius:15,width:65,paddingTop:15}} 
            upperCaseDays={false}
          />
        </View>
      </View>
    )
}

export default HomeScreen;