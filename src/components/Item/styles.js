import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal:6,
        alignItems:'center',
        paddingVertical:22,
        paddingHorizontal:5,
        borderRadius:16,
        borderColor:color.default,
        borderWidth: 1   
    },
    text:{
      color:color.primary
    }
})