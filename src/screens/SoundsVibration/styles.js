import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 1,
        paddingHorizontal: 10,
        marginTop:height * 0.055
    },
    headerContainer:{
        backgroundColor: color.primary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        height: Platform.OS === 'ios' ? height * 0.11 : height * 0.13
    },
    mainContainer:{
        flex: 1,
        alignItems: "center"
    },
    slider: {
        width: width * 0.9, 
        height: 40
    },
    headerText: {
        color: color.textDefault,
        textAlign:'right', 
        width:'67%'
    },
    switch: {
        transform: [{ scaleX: .8 }, { scaleY: .8 }], 
        borderWidth: 1.5, 
        borderColor: color.primary,
        borderRadius: 16
    },
    switchContainer: {
        flexDirection:'row', 
        alignItems:'center', 
        width: width * 0.9,
        justifyContent: 'space-between',
        paddingVertical: 10
    }
})