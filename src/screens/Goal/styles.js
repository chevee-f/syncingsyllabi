import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    header:{
        borderBottomWidth: 2,
        height: 65,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    containerStyle:{
        height: 50,
        width: width * 0.3,
        marginTop: -15,
        zIndex: 30
    },
    dropDown:{
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    placeHolder:{
        color: color.primary,
        fontSize: 16,
        fontFamily: 'Manrope',
        fontWeight: 'bold'
    },
    sortContainer:{
        marginTop: 40, 
        marginLeft:15
    }
})