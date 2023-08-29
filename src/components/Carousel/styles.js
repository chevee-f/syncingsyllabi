import { StyleSheet, Dimensions } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems:'center',
      justifyContent:'center',
      height: Platform.OS === 'ios' ? height * 0.3 : height * 0.28,
      width: '100%',
      marginLeft: width * -0.1,
      marginTop: 50
    },
    image: {
      height: Platform.OS === 'ios' ? height * 0.14 : height * 0.14
    },
    header: {
      color:color.textDefault,
      fontSize: height * 0.017,
      fontFamily:'Manrope',
      fontWeight: "bold",
      marginTop: height * 0.015,
      marginBottom: height * 0.008,
    },
    body: {
      color: color.textDefault,
      fontFamily:'Manrope',
      fontSize: Platform.OS === 'ios' ? height * 0.0143 : height * 0.02,
      lineHeight: Platform.OS === 'ios' ? 22 : 20
    },
    dotStyle:{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: '#fff'
    }
  })