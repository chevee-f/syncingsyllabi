import React, { useEffect, useContext } from 'react';
import { NavigationContainer, 
         DefaultTheme,
         DarkTheme
       } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Navigation/DrawerContent';

import RootStackScreen from './src/components/Navigation/RootStackScreen';
import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SetUpScreen from './src/screens/SetUp';
import ChangePasswordScreen from './src/screens/ChangePassword'
import ProfileScreen from './src/screens/Profile'
import CodeVerificationScreen from './src/screens/CodeVerification';
import SignUpConfirmationScreen from './src/screens/SignUpConfirmation';
import {Provider} from 'react-redux';
import {store} from './src/reducers/index';

import {Provider as AuthProvider} from './src/components/Context/AuthContext.js';
import {Context as AuthContext} from './src/components/Context/AuthContext';

import { SettingsDrawerContent } from './src/components/Navigation/SettingsDrawerContent'
import { setNavigationDrawerHome } from './src/components/Navigation/RootNavigation';
import SoundsVibrationScreen from './src/screens/SoundsVibration';
import SupportScreen from './src/screens/Support';

//const Drawer = createDrawerNavigator();

const SettingsDrawer = createDrawerNavigator();
const MainDrawer = createDrawerNavigator();

function MainDrawerContent(props) {
  const {state} = useContext(AuthContext);

  return (
    <MainDrawer.Navigator
      //initialRouteName="SetUpScreen"
      initialRouteName={state.isForCodeVerification ? "CodeVerificationScreen" : state.isGoogle ? "SetUpScreen" : "MainTabScreen" }      
      drawerContent={() => <DrawerContent />}
      drawerPosition='left'
      drawerContent={props => <DrawerContent {... props} />}
    >
      <MainDrawer.Screen name="MainTabScreen" component={MainTabScreen} />
      <MainDrawer.Screen name="SetUpScreen" component={SetUpScreen} />
      <MainDrawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <MainDrawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <MainDrawer.Screen name="SignUpConfirmationScreen" component={SignUpConfirmationScreen} />
      <MainDrawer.Screen name="CodeVerificationScreen" component={CodeVerificationScreen} />
      <MainDrawer.Screen name="SupportScreen" component={SupportScreen} />
    </MainDrawer.Navigator>
  );
}

function App() {
  const {state, retrieveToken} = useContext(AuthContext);

  useEffect(() => {
    retrieveToken()
  }, [])
  
  return (
      <Provider store={store}>
        <NavigationContainer theme={state.isDarkTheme === 'true' ? DarkTheme : DefaultTheme}>
          {state.token !== null || state.isForCodeVerification || state.isGoogle ? (

            <SettingsDrawer.Navigator
              initialRouteName="MainDrawerContent"
              drawerContent={props => <SettingsDrawerContent {... props} />}
              screenOptions={({ navigation, route }) => {
                setNavigationDrawerHome(navigation)
              }}
            >
              <SettingsDrawer.Screen name="MainTabScreen" component={MainTabScreen} />
              <SettingsDrawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
              <SettingsDrawer.Screen name="SoundsVibrationScreen" component={SoundsVibrationScreen} />
              <SettingsDrawer.Screen name="MainDrawerContent" component={MainDrawerContent} />
              <SettingsDrawer.Screen name="SupportScreen" component={SupportScreen} />
            </SettingsDrawer.Navigator>
            /*
              <Drawer.Navigator 
                //initialRouteName="SetUpScreen"
                initialRouteName={state.isForCodeVerification ? "CodeVerificationScreen" : state.isGoogle ? "SetUpScreen" : "MainTabScreen" }
                drawerContent={props => <DrawerContent {... props} />}
                drawerPosition="left"
              >
                  <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
                  <Drawer.Screen name="Setting" component={SettingScreen} />
                  <Drawer.Screen name="SetUpScreen" component={SetUpScreen} />
                  <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                  <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                  <Drawer.Screen name="SignUpConfirmationScreen" component={SignUpConfirmationScreen} />
                  <Drawer.Screen name="CodeVerificationScreen" component={CodeVerificationScreen} />

              </Drawer.Navigator>
              */
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

