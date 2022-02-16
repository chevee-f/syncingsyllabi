import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import color from '../styles/colors';

const Button = props => {
  return (
    <TouchableOpacity 
      style={{...styles.btnContainer, ...props.containerStyle}}
      onPress={() => props.pressHandler}
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
        height:50,
        borderRadius:16
    },
    text: {
      color: '#F7F9FA',
      fontSize: 14,
      fontWeight:'bold'
    }, 
});

export default Button;
