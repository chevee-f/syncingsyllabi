import React, {useEffect} from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'

const AddItem = props => {
 
    return (
      <TouchableOpacity style={{...styles.itemContainer, ...props.containerStyle}}>
        <Image 
            source={require('../../assets/icons/addSign.png')}
            resizeMode='contain'
            style={{ width:18,height:18 }}
        />
      </TouchableOpacity>
    );
};

export default AddItem;
