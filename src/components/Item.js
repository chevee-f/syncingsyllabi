import React, {useEffect} from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import color from '../styles/colors'
import label from '../styles/label'

var {height, width} = Dimensions.get('window');

const Item = props => {
 
    return (
      <TouchableOpacity style={{...styles.itemContainer, ...props.containerStyle}}>
          <Text style={{...styles.text, ...label.boldExtraSmallHeading2, ...props.textStyle}}>{props.code}</Text>
          <Text style={{...styles.text, ...label.extraSmallHeading, ...props.textStyle}}>{props.goal}</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer:{
        width: width * 0.21,
        marginTop: height * 0.012,
        marginHorizontal:6,
        alignItems:'center',
        paddingVertical:22,
        paddingHorizontal:5,
        borderRadius:16,
        borderColor:color.default,
        borderWidth: 1   
    },
    text:{
      color:color.primary
    }
});

export default Item;
