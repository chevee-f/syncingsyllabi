import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
      container:{
        //height: height * 0.64
      },
      header:{
        flexDirection:'row',
        width:width * 0.89,
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        marginTop:15,
        marginBottom:5
      },
      progressContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
      },
      textPercentage:{
        //color: color.primary,
        alignSelf:'flex-end',
        marginTop:5
      },
      calendar:{
        height: 80, 
        marginTop: 30,
        overflow: 'visible'
      },
      calendarHeader:{
       // color: '#0036A1', // dark blue
        position: 'absolute', 
        left: 20, 
        top: -45, 
        fontFamily:'Manrope',
        fontSize:23
      },
      dateNumber:{
        color: '#0036A1',
        top: -16, 
        fontFamily:'Manrope',
        fontWeight: '600',
        fontSize: 26,
      },
      dateName:{
        color: color.primary,
        top: 35,
        fontWeight: '600'
      },
      weekendDateNumber: {
        color: '#0036A1',
        top: -16, 
        fontFamily:'Manrope',
        fontWeight: '600',
        fontSize: 26
      },
      weekendDateName: {
        color: color.primary,
        top: 35,
        fontWeight: '600'
      },
      markedDate: {
        top: 10, 
        bottom: 0
      },
      highlightDateNumber: {
        top: -32,
        fontSize: 26,
        fontWeight: '600',
        color: 'white'
      },
      highlightDateName: {
        fontSize: 12,
        fontWeight: '600',
        height: 20,
        width: 100,
        flex: 1,
        position: 'absolute',
        top: 50,
        color: 'white'
      },
      highlightDateContainer:{
        top: -10,
        justifyContent: 'flex-end', 
        height: 80,
        width: 64,
        borderRadius: 16,
        backgroundColor: '#0036A1'
      },
      dayContainer:{
        top: -10,
        justifyContent: 'center', 
        height: 80,
        width: 64,
        borderRadius: 16,
        backgroundColor: color.primaryLight //blue
      },
      inputContainer: {
        borderRadius: 4,
        height: height * 0.055,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8
      },
      input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: height * 0.063,
        overflow: 'hidden',
        backgroundColor: '#fbfbfb',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: height * 0.016,
        justifyContent:'center',
      },
      closeBtn: {
        zIndex: 999,
        alignSelf: 'flex-end',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        borderRadius: 100,
        backgroundColor: '#E6EAF2',
        marginTop: 13,
        marginRight: 13,
        marginBottom: 5
      },
      close:{
        alignSelf:'flex-end',
        marginTop: 13,
        marginRight: 13,
        marginBottom: 5
      },
})