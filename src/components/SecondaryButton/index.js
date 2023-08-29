import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './styles'

const DefaultButton = ({
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity 
      style={{...styles.btnContainer, ...props.containerStyle}}
      onPress={onPress} disabled={props.disabled}>
        {props.imgSource !== undefined &&
          <Image 
              source={props.imgSource}
              style={styles.image}
          />
        }
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {props.type == 'add-file' && 
            <View>
              <Text
                style={{
                  color: '#0036A1',
                  fontSize: 20
                }}>+ </Text>
            </View>
          }
          <Text style={!props.disabled ? {...styles.text, ...props.textStyle} : [{...styles.text, ...props.textStyle}, {color: 'gray'}]}>
              {props.title}
          </Text>
        </View>
    </TouchableOpacity>
  );
};

export default DefaultButton;
