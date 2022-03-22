import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
      container:{
        //height: height * 0.64
      },
      progressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
      },
      textPercentage:{
        color: color.primary,
        alignSelf:'flex-end',
        marginTop:5
      },
      calendarStyle:{
        height: Platform.OS === 'ios' ? height * 0.15 : height * 0.2,
        marginHorizontal:16
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
        color: color.textDefault,
        marginBottom:-50
      },
      highlightDateNumberStyle:{
        color: color.textDefault,
        fontFamily:'Manrope',
        fontSize:24
      },
      highlightDateContainerStyle:{
        backgroundColor: color.primary,
        borderRadius:15,
        width:65,
        paddingTop:15
      },
})