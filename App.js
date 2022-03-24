import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Navigation/DrawerContent';

import RootStackScreen from './src/components/Navigation/RootStackScreen';
import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SettingScreen from './src/screens/Setting';
import SetUpScreen from './src/screens/SetUp';
import ChangePasswordScreen from './src/screens/ChangePassword'

import CodeVerificationScreen from './src/screens/CodeVerification';
import SignUpConfirmationScreen from './src/screens/SignUpConfirmation';

import {Provider} from 'react-redux';
import {store} from './src/reducers/index';

import {Provider as AuthProvider} from './src/components/Context/AuthContext.js';
import {Context as AuthContext} from './src/components/Context/AuthContext';

const Drawer = createDrawerNavigator();


function App() {
  const {state, retrieveToken} = React.useContext(AuthContext);

  useEffect(() => {
    retrieveToken()
  }, [])

  return (
    <Provider store={store}>
          <NavigationContainer>
            {
            state.token !== null || state.isForCodeVerification || state.isGoogle ? (
                <Drawer.Navigator 
                  //initialRouteName="SetUpScreen"
                  initialRouteName={state.isForCodeVerification ? "CodeVerificationScreen" : state.isGoogle ? "SetUpScreen" : "MainTabScreen" }
                  drawerContent={props => <DrawerContent {... props} />}
                >
                    <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
                    <Drawer.Screen name="Setting" component={SettingScreen} />
                    <Drawer.Screen name="SetUpScreen" component={SetUpScreen} />
                    <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

                    <Drawer.Screen name="SignUpConfirmationScreen" component={SignUpConfirmationScreen} />
                    <Drawer.Screen name="CodeVerificationScreen" component={CodeVerificationScreen} />

                </Drawer.Navigator>
              ) :
              <RootStackScreen />
              
            }
          </NavigationContainer>
    </Provider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

