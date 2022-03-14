import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: color.primary
    },
    topLineContainer:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:Platform.OS === 'ios' ? height * -0.27 : height * -0.32,
        width:'60%'
    },
    topLineImage:{
        height:height * 0.6,
        width:width * 0.92
    },
    bottomLineContainer:{
        position:'absolute',
        alignSelf:'flex-start',
        marginTop:height * 0.22,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height: height * 0.35,
        width: width * 0.75
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: width * 0.1
    },
    mainContainer: {
        flex: 1.27,
        backgroundColor: '#fff',
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingHorizontal: 20,
        paddingVertical: height * 0.04
    },
    bottomContainer:{
        flexDirection:'row',
        marginTop: height * 0.3,
        justifyContent:'center'
    },
    button: {
        marginTop: 10
    },
    text:{
        color:color.textDefault, 
        textAlign:'center',
        marginTop: height * 0.02
    }
})