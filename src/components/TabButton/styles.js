import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    btnContainer:{
        width: 98,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    text:{
        fontWeight: 'bold',
        fontFamily: 'Manrope',
        fontSize: 12
    }
})