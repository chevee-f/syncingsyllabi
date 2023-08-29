import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
        justifyContent: 'center', 
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#f2f1f6', 
        alignItems: 'center',
        borderRadius: 16,
        width: width * 0.8,
        padding:30,
    },
    buttonContainer:{
        flexDirection: 'row',
        width: width * 0.7,
        justifyContent: 'space-between',
        marginTop: 30
    },
    button:{
        width: width * 0.34,
        height: height * 0.055
    },
})