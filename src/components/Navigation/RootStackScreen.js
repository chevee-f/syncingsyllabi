import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../screens/Splash';
import SignInSignUpScreen from '../../screens/SignInSignUp';

const RootStack = createStackNavigator();
console.disableYellowBox = true;


function RootStackScreen() {

    return(
        <RootStack.Navigator 
            headerMode='none' 
            initialRouteName="SplashScreen" >

                <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
                <RootStack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen}/>
                
        </RootStack.Navigator>
    )
}


export default RootStackScreen;