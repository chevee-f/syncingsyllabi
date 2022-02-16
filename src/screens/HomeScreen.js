import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
        <Text>Home Screen</Text>
        <Button 
          title="Go to assignment screen"
          onPress={() => navigation.navigate("Assignment")}
        />
      </View>
    )
}

export default HomeScreen;