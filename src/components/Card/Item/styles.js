import { StyleSheet, Dimensions } from "react-native"
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
      icon:{
        width: 36,
        height: 36
      },
      actionContainer:{
        width: 173, 
        height: 138,
        flexDirection: 'row',
      },
      action:{
        width: 86, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth
      },
      container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 18,
        marginBottom: 8,
        height: 138,
      },
      horizontalLine:{
        borderBottomColor: '#E6EAF2',
        borderBottomWidth: 1,
        width: '85%',
        marginVertical: 18
      }
})