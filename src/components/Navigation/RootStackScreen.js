import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../screens/Splash';
import SignInSignUpScreen from '../../screens/SignInSignUp';
import MainTabScreen from '../Navigation/MainTabScreen';
import SignUpConfirmationScreen from '../../screens/SignUpConfirmation';
import SetUpScreen from '../../screens/SetUp';

const RootStack = createStackNavigator();
console.disableYellowBox = true;

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen}/>
        <RootStack.Screen name="SignUpConfirmationScreen" component={SignUpConfirmationScreen}/>
        <RootStack.Screen name="SetUpScreen" component={SetUpScreen}/>  
    </RootStack.Navigator>
);

export default RootStackScreen;