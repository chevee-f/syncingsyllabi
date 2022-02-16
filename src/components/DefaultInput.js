import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import color from '../styles/colors'

const PrimaryTextInput = props => {
  return (
    <View style={[styles.inputContainer, {borderColor: props.hasValue ? color.primary : color.default}]}>
        <TextInput
            {...props}
            mode="flat"
            style={styles.input}
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
        height: 53,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8,
    },
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 55,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: 16
    },
});

export default PrimaryTextInput;
