import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform } from "react-native"
import color from './../../styles/colors'

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
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems:'center',
    justifyContent:'center',
    height: Platform.OS === 'ios' ? height * 0.51 : height * 0.47,
    width: '100%',
    marginLeft: width * -0.1,
  },
  image: {
    height: Platform.OS === 'ios' ? height * 0.14 : height * 0.14
  },
  header: {
    color:color.textDefault,
    fontSize: height * 0.017,
    fontFamily:'Manrope',
    fontWeight: "bold",
    marginTop: height * 0.015,
    marginBottom: height * 0.008,
  },
  body: {
    color: color.textDefault,
    fontFamily:'Manrope',
    fontSize: Platform.OS === 'ios' ? height * 0.0143 : height * 0.02,
    lineHeight: Platform.OS === 'ios' ? 22 : 20
  }
})

export default CarouselCardItem
