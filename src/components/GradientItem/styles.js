import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal:6
    },
    linearGradient:{
        alignItems:'center',
        borderRadius:16
    },
    text:{
      color:color.textDefault
    },
    textSchedule:{
      color:color.textDefault,
      marginHorizontal:10,
      textAlign: 'center'
    }
})