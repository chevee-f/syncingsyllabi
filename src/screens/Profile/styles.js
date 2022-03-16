import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    mainContainer: {
        flex:1,
        padding:20,
        marginTop:35,
        backgroundColor: '#fafafa'
    },
    headerContainer: {
        flexDirection:'row'
    },
    headerText: {
        color: color.primary, 
        width:'90%',
        textAlign:'center'
    },
    backgroundImage: {
        height: height * 0.36,
        width: width * 1,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute'
    },
    cameraImage: {
        marginTop: height * -0.045,
        marginRight: width * -0.35
    },
    name: {
        color: color.primary,fontFamily: "Manrope",
        fontSize: 28,
        fontWeight: '900'
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent:'space-between', 
        width: width * 0.88,
        marginVertical: height * 0.03
    },
    title: {
        color:color.default, 
        fontWeight:'600'
    },
    count: {
        color:color.primary, 
        textAlign: 'center',
        marginTop: 12
    },
    row: {
        flexDirection: 'row'
    },
    emailContainer: {
        flexDirection: 'row', 
        marginVertical: 10, 
        marginLeft: -5
    },
    info: {
        color: color.primary, 
        marginVertical: 10
    }
})