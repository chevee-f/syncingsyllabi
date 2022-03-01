import React, {useEffect} from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'
import label from '../../styles/label'
import styles from './styles'

const GradientItem = props => {
  
  const [bgColor, setBgColor] = React.useState(
      [
          ['#FF9966', '#FF5E62'],
          ['#56CCF2', '#2F80ED'],
          ['#4776E6', '#8E54E9'],
          ['#00B09B', '#96C93D'],
          ['#A8C0FF', '#3F2B96'],
          ['#ED213A', '#93291E'],
          ['#FDC830', '#F37335'],
          ['#00B4DB', '#0083B0'],
          ['#AD5389', '#3C1053'],
          ['#EC008C', '#FC6767'],
          ['#DA4453', '#89216B'],
          ['#654EA3', '#EAAFC8']
      ]
    );
    const [selectedBgColor, setSelectedBgColor] = React.useState(['transparent', 'transparent']); 

    const getRandomColor = () => {
      var item = bgColor[Math.floor(Math.random()*bgColor.length)];
      setSelectedBgColor(item);
    }
   
    useEffect(() => {
      getRandomColor()
    });
 
    return (
      <TouchableOpacity style={{...styles.itemContainer, ...props.containerStyle}}>
        <LinearGradient
          colors={selectedBgColor}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={{...styles.text, ...label.boldExtraSmallHeading, ...props.textStyle}}>{props.code}</Text>
          <Text style={{...styles.text, ...label.extraSmallHeading, ...props.textStyle}}>{props.name}</Text>
          <Text style={{...styles.text, ...label.extraSmallHeading, ...props.textStyle}}>{props.schedule}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
};

export default GradientItem;
