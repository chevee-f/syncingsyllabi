import { StyleSheet, Dimensions } from "react-native"

var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    modal:{
      justifyContent: 'center', 
      alignItems:'center'
    },
    modalContainer:{
        //backgroundColor: '#fff', 
        borderRadius: 16,
        width: width * 0.93,
        padding:30
    },
    close:{
      alignSelf: 'flex-end'
    },
})