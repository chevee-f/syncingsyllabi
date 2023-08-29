import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
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
        width:'85%',
        justifyContent:'center'
    },
    inputContainer: {
        borderRadius: 4,
        height: height * 0.055,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8
    },
    textOtherOption: {
        textAlign: 'center',
        flexDirection:'row',
        color:color.default
    },
    container: {
        flex: 1, 
        backgroundColor: color.primary
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: height * 0.04,
        paddingTop: 10
    },
    otherOptionContainer:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    horizontalLine:{
        flex: 1, 
        height: 0.5, 
        backgroundColor: color.default
    },
    icon:{
        width:25,
        height:25,
        marginVertical:height * 0.016,
        marginHorizontal:13 
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
        borderColor: color.default,
        borderWidth: 1,
        borderRadius: 16
    },
    signInContainer:{
        flexDirection:'row',
        justifyContent:'center',
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
        marginTop:height * 0.25,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height:height * 0.35,
        width:width * 0.75
    },
    carouselContainer: {
        // flex: 1,
        justifyContent: 'center',
        // paddingBottom: 20,
        // backgroundColor: 'red'
    },
    errorMsg: {
        color: '#E54C29',
        fontSize: height * 0.0135,
    },
    forgotPassword:{
        marginTop: 10,
        padding:10,
        marginBottom:Platform.OS === 'ios' ? height * -0.025 : height * -0.065
    },
    signUpModal: {
        position: 'absolute', 
        backgroundColor: '#fff', 
        width: '100%', 
        height: 335, 
        bottom: 0, 
        zIndex: 1, 
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14
    }
})