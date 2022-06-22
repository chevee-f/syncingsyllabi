import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    triangleDown: {
        transform: [{ rotate: "180deg" }],
    },
    modal:{
        justifyContent: 'flex-end', 
        margin: height * 0.13,
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor: '#fff', 
        alignItems: 'center',
        borderRadius: 16,
        width: 250,
        height: 160,
        padding:20
    },
    sourceContainer:{
        flexDirection:'row',
        width: 225,
        justifyContent:'space-between'
    },
    source:{
        backgroundColor: color.primary,
        width: 65,
        height: 65,
        borderRadius: 16,
        marginTop:10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent:'center'
    }
})