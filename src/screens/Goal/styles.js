import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    header:{
        //marginTop: 150,
        borderBottomWidth: 2,
        height: 65,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    containerStyle:{
        height: 50,
        width: width * 0.3,
        marginTop: -15,
        zIndex: 30
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
        marginLeft:15
    }
})