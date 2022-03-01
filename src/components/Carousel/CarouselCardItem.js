import React from 'react'
import { View, Text, Dimensions, Image, Platform } from "react-native"
import styles from './styles'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
var {height, width} = Dimensions.get('window');

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={[styles.container,
    ]} key={index}>
      {item.title === 'Sync with School' ?
        <Image source={item.imgUrl} style={[styles.image,{width: Platform.OS === 'ios' ? width * 0.38 : width * 0.27}]}/> :
        <Image source={item.imgUrl} style={[styles.image,{width: Platform.OS === 'ios' ? width * 0.27 : width * 0.22}]}/>
      }
      <Text style={styles.header}>{item.title}</Text>
      <View style={{width:'100%',alignItems:'center'}}>
          <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  )
}

export default CarouselCardItem
