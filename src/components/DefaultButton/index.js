import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles'

const DefaultButton = ({
  onPress,
  ...props
}) => {
  if(!props.buttonColor)
    props.buttonColor = {backgroundColor: '#0036A1'};
  return (
    <TouchableOpacity 
      style={{...styles.btnContainer, ...props.containerStyle, ...props.buttonColor}}
      onPress={onPress}>
        <Text style={{...styles.text, ...props.textStyle}}>
          {props.title}
        </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
