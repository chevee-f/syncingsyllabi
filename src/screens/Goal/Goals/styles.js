import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
      backgroundImage:{
          height: 130,
          alignItems:'center',
          flexDirection:'row',
          justifyContent:'space-between',
          paddingLeft:25
      },
      container:{
          backgroundColor: color.default,
          width: width * 0.9,
          marginVertical: 5,
          marginHorizontal: width * 0.05,
          borderRadius: 16,
      },
      image:{
        height: height * 0.12,
        marginBottom:-20
      },
      header:{
        flexDirection:'row',
        width:width * 0.89,
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        marginTop:15,
        marginBottom:5
      }
})