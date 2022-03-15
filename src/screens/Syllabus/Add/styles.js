import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
        justifyContent: 'flex-end', 
        margin: -40,
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#fff', 
        borderRadius: 16,
        width: width * 1,
        height: height * 0.66,
        padding:20
    },
    close:{
        alignSelf:'flex-end'
    },
    inputContainer: {
        borderRadius: 4,
        height: height * 0.055,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8
    },
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: height * 0.063,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: height * 0.016,
        justifyContent:'center',
    },
    fieldContainer:{
        marginVertical:10
    }
})