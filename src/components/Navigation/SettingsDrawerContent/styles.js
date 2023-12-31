import { StyleSheet, Dimensions } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    drawer:{
      flex:1,
      backgroundColor: color.primary
    },
    drawerContent: {
      flex: 1
    },
    userInfoSection: {
      paddingLeft: 25,
      marginTop: height * 0.05
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },
    section: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginRight: 15
    },
    text:{
      color: color.textDefault, 
      fontSize: 12,
      marginLeft: 3
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3
    },
    drawerSection: {
      // marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: width * -0.05,
        alignItems: 'center'
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16
    },
    horizontalLine:{
      borderBottomColor: '#E6EAF2',
      borderBottomWidth: 1,
      width: '90%',
      marginTop: 18
    },
    switch: {
      transform: [{ scaleX: .6 }, { scaleY: .6 }], 
      borderWidth: 1.5, 
      borderColor: color.textDefault,
      borderRadius: 16
    },
    drawerText: {
      color: color.textDefault, 
      marginLeft: 10,
      alignSelf:'center',
      width: width * 0.4
    }
})