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
        marginTop:height * 0.06,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height: height * 0.35,
        width: width * 0.75
    },
    mainContainer: {
        flex: 1,
        marginTop: height * 0.26,
        backgroundColor: '#fff',
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingHorizontal: 20,
        paddingBottom: height * 0.04,
        paddingTop: 10
    },
    button: {
        marginTop: 10,
        marginBottom: 20
    },
    text:{
        color:color.textDefault, 
        textAlign:'center',
        marginTop: height * 0.02
    },
    headerImage:{
        height: Platform.OS === 'ios' ? height * 0.5 : height * 0.8,
        width: Platform.OS === 'ios' ? width * 0.5 : width * 0.71
    },
    headerImageContainer:{
        position: 'absolute',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? height * -0.12 : height * -0.30,
        width: '48%'
    },
    close:{
        alignSelf:'flex-end'
    },
    inputContainer: {
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8,
        borderColor: color.default,
        height: height * 0.15
    },
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        backgroundColor: '#fbfbfb',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: height * 0.016,
        justifyContent:'center',
        height: height * 0.16
    }
})