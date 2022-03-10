import React, { useState } from 'react';
import { Text,View,Image,Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dot from 'react-native-vector-icons/Entypo';
import color from '../../../styles/colors'
import label from '../../../styles/label'

import HomeScreen from '../../../screens/Home';
import CalendarScreen from '../../../screens/Calendar';
import AssignmentScreen from '../../../screens/Assignment';
import GoalScreen from '../../../screens/Goal';
import MainHeader from '../../MainHeader'
import styles from './styles'
import SelectSyllabus from '../../../screens/Syllabus/Select'

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Home');

    return (
      <>
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
                        source={require('../../../assets/icons/home.png')}
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
                listeners={() => ({
                  tabPress: e => {
                    setSelectedComponent('Home')
                  },
                })}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('../../../assets/icons/calendar.png')}
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
                listeners={() => ({
                  tabPress: e => {
                    setSelectedComponent('Calendar')
                  },
                })}
            />

            <Tab.Screen 
                name="SelectSyllabus" 
                component={selectedComponent == 'Home' ? HomeStackScreen : 
                           selectedComponent == 'Calendar' ? CalendarScreen :
                           selectedComponent == 'Goal' ? GoalScreen : AssignmentScreen
                          }
                options={{
                  tabBarIcon: ({ focused }) => (
                      <Image 
                        source={require('../../../assets/icons/add.png')}
                        resizeMode="contain"
                        style={{
                          width:42,
                          height:39,
                          tintColor:color.textDefault,
                        }}
                      />
                  )
                  }}
                listeners={() => ({
                  tabPress: e => {
                    e.preventDefault();
                    setModalVisible(true)
                  },
                })}
            />
             
            <Tab.Screen
                name="Profile"
                component={GoalScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('../../../assets/icons/goals.png')}
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
                listeners={() => ({
                  tabPress: e => {
                    setSelectedComponent('Goal')
                  },
                })}
            />
            <Tab.Screen
                name="Goal"
                component={AssignmentScreen}
                options={{
                tabBarIcon: ({ focused }) => (
                    <View style={styles.iconContainer}>
                      <Image 
                        source={require('../../../assets/icons/assignment.png')}
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
                listeners={({ navigation, route }) => ({
                  tabPress: e => {
                    setSelectedComponent('Assignment')
                  },
                })}
            />
        </Tab.Navigator>
        
        <SelectSyllabus 
            onClose={() => { setModalVisible(!modalVisible); }}
            modalVisible={modalVisible} 
        />
        
      </>
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
          headerLeft: null
        }} />
    </HomeStack.Navigator>
  )
}

export default MainTabScreen;
