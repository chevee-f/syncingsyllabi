import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    btnContainer:{
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,

        flexDirection:'row',
        paddingHorizontal: 10
    },
    text:{
        fontWeight: 'bold',
        fontFamily: 'Manrope',
        fontSize: 12
    },
    countContainer:{
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 50,
        marginLeft: 5
    },
    countText:{
        color: color.primary,
        fontFamily: "Manrope",
        fontSize: 12,
        fontWeight: "bold"
    }
})