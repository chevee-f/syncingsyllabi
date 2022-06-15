import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

const DefaultButton = ({
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity 
      style={{...styles.btnContainer, ...props.containerStyle}}
      onPress={onPress}>
        {props.imgSource !== undefined &&
          <Image 
              source={props.imgSource}
              style={styles.image}
          />
        }
        <Text style={{...styles.text, ...props.textStyle}}>
            {props.title}
        </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
