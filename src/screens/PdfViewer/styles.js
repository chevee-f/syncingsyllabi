import { Platform, StyleSheet, Dimensions } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  headerContainer:{
    backgroundColor: color.primary,
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.13,
    borderRadius: 25,
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:20
  },
  titleContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    alignItems:'center',
    marginTop: height * 0.04
  },
  image:{
    height: height * 0.08,
    width: width * 0.08,
    transform: [{ rotate: "180deg" }]
  },
  tab:{
    borderBottomWidth: 0,
    height: 60,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  filenameContainer: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    alignItems: 'center'
  },
  checkboxContainer:{
    paddingHorizontal: 50,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  bottomContainer: {
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-between'
  },
  prevNextImage:{
    height: height * 0.1,
    width: width * 0.14,
  },
  checkbox:{
    width:20, 
    height:20, 
    marginLeft:10
  },
  pdf: {
    flex:1,
    height: height
  }
})