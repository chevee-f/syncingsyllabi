import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './src/components/Navigation/MainTabScreen';
import SettingScreen from './src/screens/SettingScreen';
import { DrawerContent } from './src/components/Navigation/DrawerContent';

import RootStackScreen from './src/components/Navigation/RootStackScreen';
 
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/*
        <Drawer.Navigator 
          //initialRouteName="Home" 
          drawerContent={props => <DrawerContent {... props} />}
        >
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Setting" component={SettingScreen} />
        </Drawer.Navigator>
      */}
    </NavigationContainer>
  )
}

export default App;