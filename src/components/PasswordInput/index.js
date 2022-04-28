import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import * as Animatable from 'react-native-animatable';

const PrimaryTextInput = ({
    updateSecureTextEntry,
    ...props
  }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View>
      <View style={[styles.inputContainer, {borderColor: props.hasError ? color.error : props.hasValue ? color.primary : color.default}]}>
        <View style={{flexDirection:'row'}}>
          <TextInput
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
                style={[styles.input,{marginTop: isFocused || props.hasValue ? -5 : -2}]}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}  style={{justifyContent:'center'}}>
              {props.secureTextEntry ? 
              <Text style={[label.extraSmallHeading, {color: props.hasValue ? color.primary : color.default}]}>SHOW</Text> :
              <Text style={[label.extraSmallHeading, {color: props.hasValue ? color.primary : color.default}]}>HIDE</Text>
              }
          </TouchableOpacity>
        </View>
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
