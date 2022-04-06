import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
        justifyContent: 'center', 
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#fff', 
        alignItems: 'center',
        borderRadius: 16,
        width: width * 0.93,
        padding:30
    },
    image:{
        height:height * 0.12,
    },
    closeButton:{
        width: width * 0.75,
        marginTop:15
    },
})