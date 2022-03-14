import { StyleSheet, Dimensions } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    barStyle:{
    position:'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: color.primary,
    borderRadius: 22,
    height: Platform.OS === 'ios' ? height * 0.08 : height * 0.1,
    overflow:'hidden'
  },
  iconContainer:{
    alignItems:'center',
    width: 65
  },
  iconLabel:{
    color: color.textDefault,
    marginTop:3
  },
  dotStyle:{
    top:-13,
    left:1
  }
})