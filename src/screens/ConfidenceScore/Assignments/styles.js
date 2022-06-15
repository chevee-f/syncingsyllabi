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
    },
    note:{
        backgroundColor: '#FAF6EA', 
        marginVertical: 15, 
        height: 180,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    addFileButton:{
        width: width * 0.9,
        marginVertical: 15,
        flexDirection: 'row'
    }
})