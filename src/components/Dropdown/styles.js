import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    containerStyle:{
        height: 50,
        width: width * 0.9,
        marginTop: 10,
        zIndex: 30,
    },
    dropDown:{
        borderRadius: 15,
        borderColor: color.default
    },
    placeHolder:{
        color: color.primary,
        fontSize: 14,
        fontFamily: 'Manrope'
    }
})