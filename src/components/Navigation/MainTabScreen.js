import React from 'react';
import { StyleSheet,Text,View,Image,TouchableOpacity,Dimensions, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dot from 'react-native-vector-icons/Entypo';
import color from './../../styles/colors'
import label from './../../styles/label'

import AddSyllabus from '../../screens/AddSyllabus';
import HomeScreen from '../../screens/HomeScreen';
import CalendarScreen from '../../screens/CalendarScreen';
import AssignmentScreen from '../../screens/AssignmentScreen';
import GoalScreen from '../../screens/GoalScreen';
import MainHeader from '../../components/MainHeader'

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
var {height, width} = Dimensions.get('window');

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={color.textDefault}
            labeled={false}
            barStyle={{
                ...styles.barStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('./../../assets/icons/home.png')}
                        resizeMode='contain'
                        style={{ width: focused ? 25 : 30,
                                 height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                 marginTop: focused ? -5 : 0,
                                 tintColor: color.textDefault}}
                      />
                      {focused ?
                         <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                          :
                        <Text style={[label.extraSmallHeading2, styles.iconLabel]}>Home</Text>
                      }
                    </View>
                  ) 
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('./../../assets/icons/calendar.png')}
                        resizeMode='contain'
                        style={{ width: focused ? 25 : 30,
                                 height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                 marginTop: focused ? -5 : 0,
                                 tintColor: color.textDefault}}
                      />
                      {focused ?
                        <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                          :
                        <Text style={[label.extraSmallHeading2, styles.iconLabel]}>Calendar</Text>
                      }
                    </View>
                  ),
                }}
            />
             <Tab.Screen
                name="AddSyllabus"
                component={AddSyllabus}
                options={{
                tabBarIcon: ({ focused }) => (
                    <Image 
                      source={require('./../../assets/icons/add.png')}
                      resizeMode="contain"
                      style={{
                        width:42,
                        height:39,
                        tintColor:color.textDefault,
                      }}
                    />
                )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={GoalScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('./../../assets/icons/goals.png')}
                        resizeMode='contain'
                        style={{ width: focused ? 25 : 30,
                                 height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                 marginTop: focused ? -5 : 0,
                                 tintColor: color.textDefault}}
                      />
                      {focused ?
                        <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                          :
                        <Text 
                          style={[label.extraSmallHeading2, styles.iconLabel ]}>
                            Goal
                        </Text>
                      }
                    </View>
                  ),
                }}
            />
            <Tab.Screen
                name="Goal"
                component={AssignmentScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('./../../assets/icons/assignment.png')}
                        resizeMode='contain'
                        style={{ width: focused ? 25 : 30,
                                 height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                 marginTop: focused ? -5 : 0,
                                 tintColor: color.textDefault}}
                      />
                      {focused ?
                        <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                          :
                        <Text 
                          style={[label.extraSmallHeading2, styles.iconLabel]}>
                            Assignment
                        </Text>
                      }
                    </View>
                  ),
                }}
            />
        </Tab.Navigator>
    )
};

const HomeStackScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: color.primary
      },
      title: '',
      headerTintColor:'#fff',
      header: () => <MainHeader />
      
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor={color.primary} onPress={() => {navigation.openDrawer()}} />
          ),
          headerLeft: null
        }} />
    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({
  barStyle:{
    position:'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: color.primary,
    borderRadius: 22,
    height: Platform.OS === 'ios' ? height * 0.08 : height * 0.1,
    overflow:'hidden'
  },
  iconContainer:{
    alignItems:'center',
    width: 65
  },
  iconLabel:{
    color: color.textDefault,
    marginTop:3
  },
  dotStyle:{
    top:-13,
    left:1
  }
})

export default MainTabScreen;
