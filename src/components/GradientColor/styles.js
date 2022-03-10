import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal:6
    },
    linearGradient:{
        alignItems:'center',
        paddingVertical:22,
        borderRadius:16,
        height: height * 0.095
    },
    text:{
      color:color.textDefault
    }
})