import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal: 2,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: 22,
        paddingHorizontal: 5,
        borderRadius: 16,
        borderColor: color.default,
        borderWidth: 1,
        height: Platform.OS == 'ios' ? height * 0.1 : height * 0.127,
        marginBottom: 1
    },
    text:{
      color:color.primary,
      textAlign: 'center'
    }
})