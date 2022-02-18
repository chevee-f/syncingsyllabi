import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import color from '../styles/colors';

var {height, width} = Dimensions.get('window');

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

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems:'center',
        height: height * 0.058,
        borderRadius:16
    },
    text: {
      color: color.textDefault,
      fontSize: height * 0.017,
      fontWeight:'bold',
      fontFamily:'Manrope'
    }, 
});

export default DefaultButton;
