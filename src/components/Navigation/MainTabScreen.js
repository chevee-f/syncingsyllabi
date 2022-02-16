import React from 'react';
import { StyleSheet,Text,View,Image,TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AddSyllabus from '../../screens/AddSyllabus';
import HomeScreen from '../../screens/HomeScreen';
import AssignmentScreen from '../../screens/AssignmentScreen';
import GoalScreen from '../../screens/GoalScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ... styles.shadow
    }}
    onPress={onPress}>
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "#fff"
    }}>
      {children}
    </View>
  </TouchableOpacity>
}

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            labeled={false}
            barStyle={{
                position:'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#fff',
                borderRadius: 30,
                height: 90,
                overflow:'hidden',
                ... styles.shadow
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                  //tabBarLabel: 'Home',
                  tabBarColor:'blue',
                  tabBarIcon: ({ focused }) => (
                    <View style={{alignItems:'center',justifyContent:'center',top:10,width:40}}>
                      <Image 
                        source={require('./../../assets/icons/home.png')}
                        resizeMode='contain'
                        style={{
                          width:25,
                          height:25,
                          tintColor: focused ? "#fff" : "#000"
                        }}
                      />
                      <Text 
                       style={{ color: focused ? "#fff" : "#000", fontSize:12  }}>
                          HOME
                      </Text>
                    </View>
                  ) 
                }}
            />
            <Tab.Screen
                name="Assignment"
                component={AssignmentStackScreen}
                options={{
                tabBarLabel: 'Updates',
                tabBarColor:'blue',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-notifications" color={color} size={26} />
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
                        width:30,
                        height:30,
                        tintColor:'#fff',

                      }}
                    />
                ),
                tabBarButton: (props) => (
                  <CustomTabBarButton {... props} />
                )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                tabBarLabel: 'Profile',
                tabBarColor:'blue',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Goal"
                component={GoalScreen}
                options={{
                tabBarLabel: 'Goal',
                tabBarColor:'blue',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-aperture" color={color} size={26} />
                ),
                }}
            />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#7F5DF0',
    shadowOffset:{
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
    return(
      <HomeStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:'blue'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold'
        }
      }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
            headerRight: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="blue" onPress={() => {navigation.openDrawer()}} />
            )
          }} />
      </HomeStack.Navigator>
    )
  }
  
  const AssignmentStackScreen = ({navigation}) => {
    return(
      <DetailStack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:'blue'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold'
        }
      }}>
          <DetailStack.Screen name="Assignment" component={AssignmentScreen} options={{
            headerRight: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="blue" onPress={() => {navigation.openDrawer()}} />
            )
          }} />
      </DetailStack.Navigator>
    )
  }