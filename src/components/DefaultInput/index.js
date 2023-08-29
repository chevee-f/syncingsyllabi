import React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import color from '../../styles/colors'
import styles from './styles'
import * as Animatable from 'react-native-animatable';

const PrimaryTextInput = props => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <View style={[styles.inputContainer, {borderColor: props.hasError ? color.error : props.hasValue ? color.primary : color.default}]}>
          <TextInput
              disabled={props.disabled}
              {...props}
              mode="flat"
              style={[styles.input,{marginTop: isFocused || props.hasValue ? -5 : 0}]}
              onFocus={() => { setIsFocused(true)}}
              onBlur={() => { setIsFocused(false)}}
              autoCapitalize="none"
              label={props.label}
              selectionColor={color.primary}
              activeUnderlineColor={props.hasError ? color.error : color.primary}
              theme={{ colors: { text: props.hasError ? color.error : color.primary, placeholder: props.hasError ? color.error : props.hasValue ? color.primary : color.default } }}
              hasError={props.hasError}
          />
      </View>
      {props.hasError &&
        <Animatable.View animation="fadeInLeft" duration={500} style={styles.errorContainer}>
            <Text style={styles.errorMsg}>{props.errorMsg}</Text>
        </Animatable.View>
      }
    </View>
    
  );
};

export default PrimaryTextInput;
