import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: color.primary,
        marginBottom: height * -0.2
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
        marginTop: height * 0.32,
        backgroundColor: '#fff',
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingHorizontal: 20,
        paddingBottom: height * 0.04,
        paddingTop: 10
    },
    button: {
        marginTop: 10
    },
    text:{
        color:color.textDefault, 
        textAlign:'center',
        marginTop: height * 0.02
    },
    headerImage:{
        height: Platform.OS === 'ios' ? height * 0.7 : height * 1,
        width: Platform.OS === 'ios' ? width * 0.8 : width * 0.76
    },
    headerImageContainer:{
        position: 'absolute',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? height * -0.14 : height * -0.32,
        width: '70%'
    },
    modal:{
        justifyContent: 'center', 
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#fff', 
        alignItems: 'center',
        borderRadius: 16,
        width: width * 0.93,
        padding:30,
        height: height * 0.42
    },
    image:{
        height:height * 0.12,
    },
    closeButton:{
        width: width * 0.75,
        marginTop:15
    },
    close:{
        alignSelf:'flex-end'
    },
})