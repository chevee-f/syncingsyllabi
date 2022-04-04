import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal: 2
    },
    linearGradient:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16,
        height: Platform.OS == 'ios' ? height * 0.1 : height * 0.127,
    },
    text:{
      color:color.textDefault
    },
    textSchedule:{
      color:color.textDefault,
      marginHorizontal:5,
      textAlign: 'center'
    }
})