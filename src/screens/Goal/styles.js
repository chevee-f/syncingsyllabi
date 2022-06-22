import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    headerContainer:{
        backgroundColor: color.primary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 1,
        //height: height * 0.15,
        paddingHorizontal: 10,
        marginTop:height * 0.05
    },
    header:{
        //marginTop: 150,
        borderBottomWidth: 2,
        height: 65,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        //backgroundColor: '#fff'
    },
    containerStyle:{
        height: 50,
        width: width * 0.4,
        marginTop: -15,
    },
    btnContainer:{
        width: 98,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    dropDown:{
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    placeHolder:{
        color: color.primary,
        fontSize: 16,
        fontFamily: 'Manrope',
        fontWeight: 'bold'
    },
    sortContainer:{
        marginTop: 40, 
        marginLeft:15,
        zIndex: 20
    },
    dropDownContainerStyle: {
        borderWidth: 0,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginTop: -10,
        paddingVertical: 10,
        marginLeft: width * 0.1
    },
    text:{
        fontFamily: 'Manrope',
        fontWeight: 'bold',
        fontSize: 16
    }
})