import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components/Navigation/DrawerContent';

import RootStackScreen from './src/components/Navigation/RootStackScreen';
import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SignInSignUpScreen from './src/screens/SignInSignUp';
import SettingScreen from './src/screens/Setting';

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
            {state.token !== null ? (
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
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

