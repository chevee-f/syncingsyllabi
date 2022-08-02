import { Platform, StyleSheet, Dimensions } from "react-native"
import color from '../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  headerContainer:{
    backgroundColor: color.primary,
    height: height * 0.12,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
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
    height: Platform.OS === 'ios' ? 60 : 45,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  filenameContainer: {
    paddingHorizontal: 50,
    paddingVertical: Platform.OS === 'ios' ? 15 : 8
  },
  checkboxContainer:{
    paddingHorizontal: 10,
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
    width:30, 
    height:20, 
    marginLeft:10
  },
  scannedImage:{
    width: width * 1,
  },
  addImageButtonContainer:{
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    justifyContent: 'center'
  },
  source:{
    backgroundColor: color.primary,
    width: width * 0.47,
    height: 45,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    marginVertical: 5
  }
})