import React, {useEffect} from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styles'

const AddItem = ({
    onPress,
    ...props
  }) => {
    return (
      <TouchableWithoutFeedback 
          onPress={onPress}
          style={{...styles.itemContainer, ...props.containerStyle}}>
            <Image 
                source={require('../../assets/icons/addSign.png')}
                resizeMode='contain'
                style={{ width:18,height:18 }}
            />
      </TouchableWithoutFeedback>
    );
};

export default AddItem;
