import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import color from '../styles/colors'

var {height, width} = Dimensions.get('window');

const PrimaryTextInput = props => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.inputContainer, {borderColor: props.hasValue ? color.primary : color.default}]}>
        <TextInput
            {...props}
            mode="flat"
            style={[styles.input,{marginTop: isFocused || props.hasValue ? -5 : 0}]}
            onFocus={() => { setIsFocused(true)}}
            onBlur={() => { setIsFocused(false)}}
            autoCapitalize="none"
            label={props.label}
            selectionColor={color.primary}
            activeUnderlineColor={color.primary}
            theme={{ colors: { text: color.primary, placeholder: props.hasValue ? color.primary : color.default } }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 4,
        height: height * 0.056,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8
    },
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: height * 0.063,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: height * 0.016,
        justifyContent:'center',
    },
});

export default PrimaryTextInput;
