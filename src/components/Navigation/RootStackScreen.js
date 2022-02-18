import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './../../screens/SplashScreen';
import SignInSignUpScreen from '../../screens/SignInSignUpScreen';
import MainTabScreen from '../Navigation/MainTabScreen';
import SignUpConfirmationScreen from '../../screens/SignUpConfirmationScreen';

const RootStack = createStackNavigator();
console.disableYellowBox = true;

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen}/>

        <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
        <RootStack.Screen name="SignUpConfirmationScreen" component={SignUpConfirmationScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;