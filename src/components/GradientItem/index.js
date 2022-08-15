import React, {useEffect} from 'react';
import { Text, TouchableOpacity } from 'react-native';
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

    const getRandomColor = (selectedColor) => {
      //var item = bgColor[Math.floor(Math.random()*bgColor.length)];
      var item = bgColor[selectedColor];
      setSelectedBgColor(item);
    }
   
    const onTrigger = (id) => {
        props.parentCallback(id);
    }

    useEffect(() => {
      //getRandomColor(props.selectedColor)
    });
    let color = props.selectedBgColor;
    if (props.selectedBgColor == null)
      color = ["#000", "#000"]
    let borderColor = null;
    // console.log(props.isSelected)
    if(props.isSelected)
      borderColor = { borderColor: '#0036A1' }
    return (
      <TouchableOpacity onPress={() => onTrigger(props.id)} style={[{...styles.itemContainer, ...props.containerStyle}, borderColor]}>
        {/* {props.selectedBgColor !== undefined && props.selectedBgColor !== null && */}
            <LinearGradient
              colors={color}
              style={[styles.linearGradient, {paddingVertical: props.schedule ? 15 : 21}]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text numberOfLines={1} style={{...styles.text, ...label.boldExtraSmallHeading, ...props.textStyle}}>{props.code}</Text>
              <Text numberOfLines={1} style={{...styles.text, ...label.extraSmallHeading, ...props.textStyle}}>{props.name}</Text>
              <Text numberOfLines={1} style={{...styles.textSchedule, ...label.extraSmallHeading, ...props.textStyle}}>{props.schedule}</Text>
            </LinearGradient>
        {/* } */}
      </TouchableOpacity>
    );
};

export default GradientItem;
