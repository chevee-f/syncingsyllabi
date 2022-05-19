import { StyleSheet, Dimensions } from "react-native"
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
    }
})