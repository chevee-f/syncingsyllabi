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
    paddingVertical: 15
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
  },


/*

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
  },
  headerContainer:{
    backgroundColor: color.primary,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  titleContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 1,
    height: height * 0.15,
    paddingHorizontal: 10
  },
  */
})