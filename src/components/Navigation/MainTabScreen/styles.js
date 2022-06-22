import { StyleSheet, Dimensions } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  dispatchControlsContainer: { 
    width: Dimensions.get("window").width, 
    height: 40, 
    top: 64, 
    position: 'absolute'
  },
  buttonText: { color: 'white'},
  pageCounter: {
    height: 40, 
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  pdfContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    top: 0
  },
  pdfControlsContainer: { 
    width: Dimensions.get("window").width, 
    height: 40, 
    top: 24, 
    position: 'absolute'
  },
  prevButton: {
    width: 70, 
    height: 40, 
    backgroundColor: '#0036A1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextButton: {
    width: 70, 
    height: 40, 
    backgroundColor: '#0036A1',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  pageIncludedContainer: { 
    bottom: 90, 
    alignSelf: 'center',
    height: 40,
    paddingHorizontal: 10,
    position: 'absolute',
    justifyContent: 'center'
  },
  closeButton: {
    width: 70, 
    height: 40, 
    backgroundColor: '#0036A1',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  includeButton: {
    width: 70, 
    height: 40, 
    backgroundColor: '#0036A1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 70, 
    height: 40, 
    backgroundColor: '#0036A1',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
    barStyle:{
    position:'absolute',
    bottom: 10,
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