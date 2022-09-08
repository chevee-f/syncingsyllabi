import { preventAutoHide } from "expo-splash-screen";
import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    headerContainer:{
        backgroundColor: color.primary,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        overflow: 'hidden'
      },
      titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width * 1,
        //height: height * 0.15,
       paddingHorizontal: 10,
       marginTop:height * 0.05
      },
      topLineContainer:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:Platform.OS === 'ios' ? height * -0.27 : height * -0.32,
        width:'55%'
      },
      bottomLineContainer:{
          position:'absolute',
          alignSelf:'flex-start',
          marginTop: Platform.OS === 'ios' ? height * -0.002 : height * 0.07,
          marginLeft:width * -0.32
      },
      container:{
        flexDirection:'row',
        marginHorizontal:20
      },
      profileContainer:{
        flexDirection:'row',
        marginTop:25
      },
      avatarContainer:{
        height:68,
        alignItems:'center',
        width: 68,
        overflow: 'hidden', 
        borderColor: color.textDefault,
        borderWidth: 4,
        borderRadius: 50
      },
      nameContainer:{
        justifyContent:'center',
        marginLeft:10,
        width: width * 0.42
      },
      menuContainer:{
        height:200,
        justifyContent:'center',
        marginLeft:-5
      },
      rightContainer:{
        flexDirection:'row',
        marginTop:15,
        width: width * 0.3,
        marginLeft: width * -0.13
      },
      badgeCount:{
        fontFamily: "Manrope",
        fontSize: 12,
        color: '#fff',
        fontWeight:'bold',
        textAlign: 'center'
      },
      notificationContainer:{
        justifyContent:'center',
        alignItems:'flex-end', 
        width: width * 0.32,
      },
      badgeContainer:{
        backgroundColor: '#FF3333',
        width: 18,
        height: 17,
        borderRadius: 20,
        position: 'absolute',
        marginTop: height * 0.098,
        marginLeft: width * 0.28
      }
})