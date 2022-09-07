import { StyleSheet, Dimensions } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    weekendDateNameStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0036A1',
        top: -5
    }
})