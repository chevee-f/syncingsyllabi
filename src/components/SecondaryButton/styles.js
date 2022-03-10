import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    btnContainer: {
        backgroundColor: color.primaryLight,
        justifyContent: 'center',
        alignItems:'center',
        height: height * 0.058,
        borderRadius:16,
        borderColor: color.primary,
        borderWidth:0.5,
        width: width * 0.5,
    },
    text: {
      color: color.primary,
      fontSize: height * 0.017,
      fontWeight:'bold',
      fontFamily:'Manrope'
    }, 
})