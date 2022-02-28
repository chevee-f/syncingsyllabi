import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Navigation/DrawerContent';

import RootStackScreen from './src/components/Navigation/RootStackScreen';
import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SignInSignUpScreen from './src/screens/SignInSignUpScreen';
import SettingScreen from './src/screens/SettingScreen';

import {Provider} from 'react-redux';
import {store} from './src/reducers/index';
 
const Drawer = createDrawerNavigator();

const App = () => {
  const [userToken, setUserToken] = React.useState(null);

  useEffect(() => {
    setTimeout(async() => {
        let userToken=null;
        try{
          userToken = await AsyncStorage.getItem('userToken')
          setUserToken(userToken)
        }catch (e) {
          Alert.alert(e.message)
        }
    }, 1000)
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        {
        userToken !== null ? (
            <Drawer.Navigator 
              //initialRouteName="Home" 
              drawerContent={props => <DrawerContent {... props} />}
            >
              <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
              <Drawer.Screen name="Setting" component={SettingScreen} />
              <Drawer.Screen name="SignInSignUp" component={SignInSignUpScreen} />
            </Drawer.Navigator>
          ) :
          <RootStackScreen />
        }

      </NavigationContainer>
    </Provider>
  )
}

export default App;