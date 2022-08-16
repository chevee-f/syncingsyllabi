import React, { useEffect, useContext } from 'react';
import { NavigationContainer, 
         DefaultTheme,
         DarkTheme} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Navigation/DrawerContent';
import { useNavigation } from '@react-navigation/native'

import RootStackScreen from './src/components/Navigation/RootStackScreen';
import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SetUpScreen from './src/screens/SetUp';
import ChangePasswordScreen from './src/screens/ChangePassword'
import ProfileScreen from './src/screens/Profile'
import CodeVerificationScreen from './src/screens/CodeVerification';
import LoadingScreen from './src/screens/Loading';
import SoundsVibrationScreen from './src/screens/SoundsVibration';
import SupportScreen from './src/screens/Support';
import ConfidenceScoreScreen from './src/screens/ConfidenceScore'
import PdfViewerScreen from './src/screens/PdfViewer'
import ImageViewerScreen from './src/screens/ImageViewer'

import {Provider} from 'react-redux';
import {store} from './src/reducers/index';
import {Provider as AuthProvider} from './src/components/Context/AuthContext.js';
import {Context as AuthContext} from './src/components/Context/AuthContext';
import { SettingsDrawerContent } from './src/components/Navigation/SettingsDrawerContent'
import { setNavigationDrawerHome } from './src/components/Navigation/RootNavigation';
import color from './src/styles/colors'
import messaging from '@react-native-firebase/messaging';

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
      <MainDrawer.Screen name="LoadingScreen" component={LoadingScreen} />
      <MainDrawer.Screen name="CodeVerificationScreen" component={CodeVerificationScreen} />
      <MainDrawer.Screen name="SupportScreen" component={SupportScreen} />
      <MainDrawer.Screen name="ConfidenceScoreScreen" component={ConfidenceScoreScreen} />
      <MainDrawer.Screen name="PdfViewerScreen" component={PdfViewerScreen} options={{ headerLeft: null }} />
      <MainDrawer.Screen name="ImageViewerScreen" component={ImageViewerScreen} options={{ headerLeft: null }} />
    </MainDrawer.Navigator>
  );
}

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#202123',
    text: color.default
  }
}

function App() {
  const {state, retrieveToken} = useContext(AuthContext);

  useEffect(() => {
    retrieveToken()

    const navigation = useNavigation()
    messaging().onNotificationOpenedApp(remoteMessage => {
      let res = remoteMessage.notification.title.search("Assignment");
      res === -1 ? navigation.navigate('Goal') : navigation.navigate('Assignment')   
    });

  }, [])
  
  return (
      <Provider store={store}>
        <NavigationContainer theme={state.isDarkTheme === 'true' ? CustomDarkTheme : DefaultTheme}>
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

