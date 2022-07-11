import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        marginTop:height * 0.02,
        flexDirection:'row', 
        alignSelf:'center'
    },
    labelContainer:{
        width: width * 0.6
    },
    scoreContainer:{
        width: width * 0.3
    },
    fieldContainer:{
        marginVertical: 10,
        marginHorizontal: 20
    },
    checkbox:{
        width:20, 
        height:20, 
        marginHorizontal:10
    },
    checkboxText: {
        marginRight: 35,
        fontSize: 16,
        color: color.primary
    },
    subContainer:{
        flexDirection:'row',
        width: width * 0.6,
        alignItems:'center',
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    scoreContainer:{
        width: width * 0.3
    },
    scoreText: {
        fontWeight:'bold', 
        fontSize: 17,
        textAlign: 'center'
    },
    inputContainer:{
        width: width * 0.78
    }
})