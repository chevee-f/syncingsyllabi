import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles'
import color from '../../styles/colors'

const DefaultButton = ({
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity 
      style={[styles.btnContainer, {backgroundColor: props.isActive ? '#dee3eb': null}]}
      onPress={onPress}>
        <Text style={[styles.text, {color: props.isActive ? color.primary : color.default}]}>
          {props.title}
        </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
