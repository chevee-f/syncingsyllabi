import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Context as AuthContext} from '../../Context/AuthContext';

import SplashScreen from '../../../screens/Splash';
import SignInSignUpScreen from '../../../screens/SignInSignUp';
import RecoverAccountScreen from '../../../screens/RecoverAccount';
import MainTabScreen from '../MainTabScreen';

import ChangePasswordScreen from '../../../../src/screens/ChangePassword'
import SoundsVibrationScreen from '../../../../src/screens/SoundsVibration';
import SupportScreen from '../../../../src/screens/Support';
import NotificationListScreen from '../../../../src/screens/NotificationList'

const RootStack = createStackNavigator();
console.disableYellowBox = true;


function RootStackScreen() {
    const { state } = useContext(AuthContext);
    return(
        <RootStack.Navigator 
            headerMode='none' 
            //initialRouteName="RecoverAccountScreen" 
            initialRouteName={state.isSignOut ? "SignInSignUpScreen" : "SplashScreen" }
        >

                <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
                <RootStack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen}/>
                <RootStack.Screen name="RecoverAccountScreen" component={RecoverAccountScreen}/>                
        </RootStack.Navigator>
    )
}


export default RootStackScreen;