import { StyleSheet, Dimensions, Platform } from "react-native"

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
    }
})