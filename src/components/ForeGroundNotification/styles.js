import { StyleSheet, Dimensions } from "react-native"
import label from '../../styles/label'
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
        justifyContent: 'flex-start', 
        margin: height * 0.155,
        alignItems:'center',
    },
    modalContainer:{
        backgroundColor: '#fff', 
        borderRadius: 16,
        width: width * 0.95,
        height: height * 0.48,
        justifyContent:'flex-start',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth:0.1
    },
    headerContainer:{
        borderBottomWidth: 1.5,
        borderBottomColor: color.default, 
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    message:{
        fontSize: height * 0.017, 
        paddingVertical: 2,
        fontFamily: "Manrope",
        fontWeight: '600'
    },
    messageContainer:{
        paddingVertical: 15,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title:{
        color: color.primary,
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: height * 0.025
    },
    triangleUp: {
        transform: [{ rotate: "360deg" }],
        marginLeft: width * 0.64
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
    seeAll:{
        color: color.primary,
        fontFamily: "Manrope",
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'right',
        marginRight: 20,
        paddingVertical: 15,
    },
    content:{
        width: width * 0.75
    }
})