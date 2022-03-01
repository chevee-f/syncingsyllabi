import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles'

const DefaultButton = ({
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity 
      style={{...styles.btnContainer, ...props.containerStyle}}
      onPress={onPress}
    >
     <Text 
       style={{...styles.text, ...props.textStyle}}
     >
      {props.title}
     </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
