import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles'
import color from '../../styles/colors'

const DefaultButton = ({
  onPress,
  ...props
}) => {

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
        {props.count !== undefined ?
            props.isDone !== undefined && props.isDone ?
              <View style={[styles.countContainer]}>
                <Image 
                    source={require('../../assets/icons/Vector.png')}
                    style={styles.image}
                />
              </View>
            :
            <View style={[styles.countContainer, {backgroundColor: props.isActive ? '#fff' : '#dee3eb'}]}>
              <Text style={styles.countText}>{props.count}</Text>
            </View>
          : null
        }
    </TouchableOpacity>
  );
};

export default DefaultButton;
