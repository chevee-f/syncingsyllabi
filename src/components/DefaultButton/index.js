import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
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
        {props.image == 'google' &&
          <Image 
            source={require('../../assets/icons/google.png')}
            resizeMode='contain'
            style={{ marginRight: 10}}
          />
        }
        {props.image == 'facebook' &&
          <Image 
            source={require('../../assets/icons/facebook.png')}
            resizeMode='contain'
            style={{ marginRight: 10}}
          />
        }
        <Text style={{...styles.text, ...props.textStyle}}>
          {props.title}
        </Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
