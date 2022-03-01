import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    btnContainer: {
        width: '100%',
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems:'center',
        height: height * 0.058,
        borderRadius:16
    },
    text: {
      color: color.textDefault,
      fontSize: height * 0.017,
      fontWeight:'bold',
      fontFamily:'Manrope'
    }, 
})