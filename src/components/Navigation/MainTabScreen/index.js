import React, { useState, useEffect, useContext } from 'react';
import { Text,View,Image,Platform,Dimensions,TouchableOpacity } from 'react-native';

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
import SelectSyllabus from '../../../screens/Syllabus/Select';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalByUser } from '../../../actions/goal';
import { getAssignmentsByUser } from '../../../actions/assignments';
import { getSyllabusByUser } from '../../../actions/syllabus';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
var {height, width} = Dimensions.get('window');

const MainTabScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Home');
  const [counter, setCounter] = useState(0);
  const [currentRoute, setCurrentRoute] = useState('Home')

  const { state } = useContext(AuthContext);
  const { goals } = useSelector(state => state.goalReducer);
  const { assignments } = useSelector(state => state.assignmentsReducer);
  const { syllabus } = useSelector(state => state.syllabusReducer);

  const dispatch = useDispatch();
  useEffect(async() => {
    console.log("SHOULD UPDATE COUNTERRRRRRRRRRRRRRRRRR AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    
    // let userId = state.userId
    // let token = state.token
    // await dispatch(getAssignmentsByUser(userId, token));
    // await dispatch(getGoalByUser(userId, token));
    // console.log(assignments)
    console.log(route)
    if(route.params)
      console.log('has params')
  }, []);

  // useEffect(async ()=> {
  //   if(assignments.length > 0) {
  //     console.log(JSON.stringify(assignments))
  //     await AsyncStorage.setItem('@assignments', JSON.stringify(assignments))
  //   }
  // }, [assignments.length])
    if(route.params)
      console.log('has params')
    return (
      <>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={color.textDefault}
            labeled={false}
            barStyle={{ ...styles.barStyle }}
        >
          <Tab.Screen
              name="Home"
              children={({navigation, route1}) => {
                return(
                  <Stack.Navigator screenOptions={{
                    headerStyle:{
                      backgroundColor: color.primary
                    },
                    title: '',
                    headerTintColor:'#fff',
                    header: () => <MainHeader/>
                    
                  }}>
                      <Stack.Screen 
                        name="Home" 
                        children={() => <HomeScreen counter={()=> {
                          if(route.params) {
                            return route.params.counter
                          }
                          return counter;
                        }} route={currentRoute} />}
                        options={{ headerLeft: null }} />
                  </Stack.Navigator>
                )
              }}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={styles.iconContainer}>
                    <Image 
                      source={require('../../../assets/icons/home.png')}
                      resizeMode='contain'
                      style={{ width: focused ? 25 : 30,
                                height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                marginTop: focused ? -5 : 0,
                                tintColor: color.textDefault }}
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
                  setCurrentRoute('Home');
                  setCounter(counter+1);
                  setSelectedComponent('Home')
                },
              })}
          />
          <Tab.Screen
              name="Calendar"
              children={({navigation, route}) => <CalendarScreen counter={counter} route={currentRoute} />}
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
                  setCurrentRoute('Calendar');
                  setCounter(counter+1);
                  setSelectedComponent('Calendar')
                },
              })}
          />

          <Tab.Screen 
              name="SelectSyllabus" 
              component={selectedComponent == 'Home' ? HomeStackScreen : 
                          selectedComponent == 'Calendar' ? CalendarStackScreen :
                          selectedComponent == 'Goal' ? GoalStackScreen : AssignmentScreen
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
              name="Goal"
              component={GoalStackScreen}
              options={{
              tabBarIcon: ({ focused }) => (
                  <View style={styles.iconContainer}>
                    <Image 
                      source={require('../../../assets/icons/goals.png')}
                      resizeMode='contain'
                      style={{ width: focused ? 25 : 30,
                                height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                marginTop: focused ? -5 : 0,
                                tintColor: color.textDefault }}
                    />
                    {focused ?
                      <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                        :
                      <Text style={[label.extraSmallHeading2, styles.iconLabel ]}>
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
              name="Assignment"
              children={({navigation, route}) => <AssignmentScreen counter={()=> {
                if(route.params) {
                  return route.params.counter
                }
                return counter;
              }} route={currentRoute} />}
              options={{
              tabBarIcon: ({ focused }) => (
                  <View style={styles.iconContainer}>
                    <Image 
                      source={require('../../../assets/icons/assignment.png')}
                      resizeMode='contain'
                      style={{ width: focused ? 25 : 30,
                                height: focused ? 25 : Platform.OS === 'ios' ? 28 : 24,
                                marginTop: focused ? -5 : 0,
                                tintColor: color.textDefault }}
                    />
                    {focused ?
                      <Dot name="dot-single" color={color.textDefault} size={50} style={styles.dotStyle} />
                        :
                      <Text style={[label.extraSmallHeading2, styles.iconLabel]}>
                          Assignment
                      </Text>
                    }
                  </View>
                ),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: e => {
                  setCurrentRoute('Assignment');
                  setCounter(counter+1);
                  setSelectedComponent('Assignment')
                },
              })}
          />
        </Tab.Navigator>
        
        <SelectSyllabus 
            onClose={() => { setModalVisible(!modalVisible); }}
            modalVisible={modalVisible} 
            isSideModal={false}
            nextScreen={'ConfidenceScore'}
        />
      </>
    )
};

const HomeStackScreen = ({navigation}) => {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: color.primary
      },
      title: '',
      headerTintColor:'#fff',
      header: () => <MainHeader/>
      
    }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerLeft: null }} />
    </Stack.Navigator>
  )
}

const GoalStackScreen = (props) => {
  return(
    <Stack.Navigator>
        <Stack.Screen
          name="Goal" 
          component={GoalScreen} 
          options={{ headerLeft: null }} />
    </Stack.Navigator>
  )
}

const CalendarStackScreen = ({navigation}) => {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: color.primary
      },
      title: '',
      headerTintColor:'#fff',
      header: () => <View style={[styles.headerContainer,{height: Platform.OS === 'ios' ? height * 0.11 : height * 0.13}]}>
                      <View style={styles.titleContainer}>
                          <Text style={[label.boldMediumHeading, {color: color.textDefault, textAlign:'center'}]}>
                            Calendar
                          </Text>
                      </View>
                    </View>
      
    }}>
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen} 
          options={{ headerLeft: null }} />
    </Stack.Navigator>
  )
}

export default MainTabScreen;
