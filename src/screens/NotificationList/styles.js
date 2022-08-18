import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

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
    headerText: {
        color: color.textDefault,
        textAlign:'center', 
        width:'86%'
    },
    message:{
        fontSize: height * 0.017, 
        paddingVertical: 2,
        fontFamily: "Manrope",
        fontWeight: '600'
    },
    messageContainer:{
        paddingVertical: 15,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderColor: color.default
    },
    title:{
        color: color.primary,
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: height * 0.025
    },
    newIndicator:{
        backgroundColor: '#FF3333',
        width: 8,
        height: 8,
        borderRadius: 5,
        marginRight: 10
    },
    dueDateContainer:{
        flexDirection:'row', 
        alignItems:'center'
    },
    clearAll:{
        color: color.primary,
        fontFamily: "Manrope",
        fontWeight: 'bold',
        fontSize: height * 0.018,
        textAlign: 'right',
        marginRight: 20,
        paddingVertical: 15,
    },
    clearContainer:{
        width: width * 1,
        borderBottomWidth: 1,
        borderColor: color.default
    },
    content:{
        width: width * 0.8
    }
})