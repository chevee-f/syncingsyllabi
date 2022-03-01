import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import color from '../../styles/colors'
import styles from './styles'

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

export default PrimaryTextInput;
