import React, {useEffect} from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import label from '../../styles/label'
import styles from './styles'

const Item = props => {
 
    return (
      <TouchableOpacity style={{...styles.itemContainer, ...props.containerStyle}}>
          <Text style={{...styles.text, ...label.boldExtraSmallHeading2, ...props.textStyle}}>{props.code}</Text>
          <Text style={{...styles.text, ...label.extraSmallHeading, ...props.textStyle}}>{props.goal}</Text>
      </TouchableOpacity>
    );
};

export default Item;
