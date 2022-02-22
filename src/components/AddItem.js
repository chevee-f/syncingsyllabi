import React, {useEffect} from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import color from '../styles/colors'

var {height, width} = Dimensions.get('window');

const AddItem = props => {
 
    return (
      <TouchableOpacity style={{...styles.itemContainer, ...props.containerStyle}}>
        <Image 
            source={require('../assets/icons/addSign.png')}
            resizeMode='contain'
            style={{ width:18,height:18 }}
        />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        height: Platform.OS == 'ios' ? height * 0.1 : height * 0.127,
        marginTop: height * 0.012,
        marginHorizontal:6,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:16,
        borderColor:color.default,
        borderWidth: 1   
    },
    text:{
      color:color.primary
    }
});

export default AddItem;
