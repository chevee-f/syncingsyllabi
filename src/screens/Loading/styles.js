import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    topLineContainer:{
        alignSelf:'flex-end',
        marginTop:height * -0.27,
        width:'60%'
    },
    topLineImage:{
        height:height * 0.6,
        width:width * 0.92
    },
    bottomLineContainer:{
        alignSelf:'flex-start',
        marginTop:height * 0.15,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height:height * 0.35,
        width:width * 0.75
    },
    successMessage:{
        color:color.textDefault,
        textAlign:'center',
        width: Platform.OS === 'ios' ? width * 0.75 : width * 0.7,
        lineHeight: 22
    },

    spinnerContainer: {
        width:'100%',
        justifyContent: "center",
        alignItems:'center',
        position:'absolute',
        marginTop: Platform.OS === 'ios' ? height * 0.68 : height * 0.75
      },
})