import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    containerStyle:{
        height: 50,
        width: width * 0.9,
        marginTop: 10,
        // zIndex: 30
    },
    dropDown:{
        borderRadius: 15,
        borderColor: color.default,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: '#fbfbfb',
    },
    dropDownContainerStyle: {
        borderWidth: 0,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginTop: 1,
        paddingVertical: 10
    },
    placeHolder:{
        color: color.primary,
        fontSize: 14,
        fontFamily: 'Manrope',
        fontWeight: 'normal'
    },
    text:{
        color: color.primary,
        fontFamily: 'Manrope',
        fontWeight: 'bold',
        fontSize: 16
    }
})