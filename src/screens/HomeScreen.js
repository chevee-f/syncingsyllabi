import React from 'react';
import { Button, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import label from './../styles/label'
import color from './../styles/colors'

const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex:1 }}>
        <View style={{margin:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
             <Text style={[label.boldExtraSmallHeading,{color:color.primary}]}>SEMESTER PROGRESS</Text>
             <Text style={[label.extraSmallHeading2,{color:color.primary}]}>26/45</Text>
          </View>
          
          <ProgressBar progress={0.5} color={color.primary} />
          <Text style={[label.boldExtraSmallHeading,{color:color.primary,alignSelf:'flex-end',marginTop:5}]}>57% COMPLETE</Text>
        </View>
      </View>
    )
}

export default HomeScreen;