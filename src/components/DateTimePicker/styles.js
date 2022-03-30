import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    triangleDown: {
        transform: [{ rotate: "180deg" }],
    },
    modal:{
        justifyContent: 'center', 
        alignItems:'center',
    },
    modalContainer:{
        backgroundColor: '#fff', 
        alignItems: 'center',
        borderRadius: 16,
        width: width * 0.93,
        padding:30
    },
    textStyle:{
        fontFamily: 'Manrope',
        color: color.primary
    },
    dayLabelsWrapper:{
        borderTopWidth:0,
        borderBottomWidth:0
    },
    titleStyle:{
        fontSize:21
    },
    horizontalLine:{
        borderBottomColor: color.primary,
        borderBottomWidth: 0.3,
        width: width * 0.85,
        marginTop:15
    },
    buttonContainer:{
        flexDirection: 'row',
        width: width * 0.84,
        justifyContent: 'space-between',
        marginTop: 15
    },
    button:{
        width: width * 0.4
    }
})