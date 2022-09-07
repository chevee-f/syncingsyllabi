import { StyleSheet, Dimensions, Platform } from "react-native"
import color from './../../styles/colors'

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    headerContainer:{
        backgroundColor: color.primary,
        height: Platform.OS === 'ios' ? height * 0.25 : height * 0.20,
        width:'100%',
        borderRadius:16,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20
    },
    image: {
        width: width * 0.32,
        height: height * 0.1905,
        position:'absolute'
    },
    imageContainer:{
        marginTop: Platform.OS === 'ios' ? height * -0.14 : height * -0.09,
        marginLeft: Platform.OS === 'ios' ? width * -0.43 : width * -0.38,
        elevation: 1
    },
    headerActionText:{
        color:color.textDefault,
        lineHeight:24,
        width:'70%'
    },
    tab:{
        borderBottomWidth: 0.4,
        height: 52,
        borderColor: '#C1C6CE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 19,
    },
})