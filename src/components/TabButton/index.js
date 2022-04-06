import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles'
import color from '../../styles/colors'
import Moment from 'moment';

const DefaultButton = ({
  onPress,
  ...props
}) => {

  const tomorrow = Moment().add(1, 'days');
  const onClick = (value) => {
    props.onSelect(value);
  }

  return (
    <TouchableOpacity 
      style={[styles.btnContainer, {backgroundColor: props.isActive ? '#dee3eb': null}]}
      onPress={() => {onClick(props.value)}}>
        <Text style={[styles.text, {color: props.isActive ? color.primary : color.default}]}>
          {props.title}
        </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
