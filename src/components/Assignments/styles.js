import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({

    close:{
        alignSelf:'flex-end',
        marginTop: 13,
        marginRight: 13,
        marginBottom: 5
      }
});