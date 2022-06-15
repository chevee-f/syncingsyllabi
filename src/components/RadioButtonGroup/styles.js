import { StyleSheet, Dimensions, Platform } from "react-native"
import color from '../../styles/colors'
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    scoreText: {
        fontWeight:'bold', 
        fontSize: 17,
        textAlign: 'center'
    },
    radioText: {
        marginRight: 35,
        fontSize: 16,
        color: color.primary
    },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: color.primary,
		alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
	},
	selectedRb: {
		width: 12,
		height: 12,
		borderRadius: 10,
		backgroundColor: color.primary,
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
    subContainer:{
        flexDirection:'row',
        width: width * 0.6,
        alignItems:'center'
    },
    scoreContainer:{
        width: width * 0.3
    },
    inputContainer:{
        width: width * 0.8
    }
})