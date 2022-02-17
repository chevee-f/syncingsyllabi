import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './../../screens/SplashScreen';
import SignInSignUpScreen from '../../screens/SignInSignUpScreen';

const RootStack = createStackNavigator();
console.disableYellowBox = true;

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        {/*
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        */}
        <RootStack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;