import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Video from 'react-native-video';

var {height, width} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
    return (
      <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
        {
          <Video
            source={require('./../assets/SplashScreen.mp4')}
            style={{ width: width, height: height }}
            resizeMode="cover"
            onEnd={() => navigation.navigate('SignInSignUpScreen')}
          />
        }
      </View>
    )
}

export default SplashScreen;