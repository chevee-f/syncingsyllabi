import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Context as AuthContext} from '../../Context/AuthContext';

import SplashScreen from '../../../screens/Splash';
import SignInSignUpScreen from '../../../screens/SignInSignUp';
import MainTabScreen from '../MainTabScreen';

const RootStack = createStackNavigator();
console.disableYellowBox = true;


function RootStackScreen() {
    const { state } = useContext(AuthContext);
    return(
        <RootStack.Navigator 
            headerMode='none' 
            //initialRouteName="SplashScreen" 
            initialRouteName={state.isSignOut ? "MainTabScreen" : "MainTabScreen" }
        >

                <RootStack.Screen name="MainTabScreen" component={MainTabScreen}/>
                
        </RootStack.Navigator>
    )
}


export default RootStackScreen;