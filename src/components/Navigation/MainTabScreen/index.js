import React, { useState } from 'react';
import { Text,View,Image,Platform,Dimensions } from 'react-native';

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
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FilePickerManager from 'react-native-file-picker';
import * as RNFS from 'react-native-fs'
import Pdf from 'react-native-pdf';

import {Context as AuthContext} from '../../Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getOCRScanResult } from '../../../actions/syllabus';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
var {height, width} = Dimensions.get('window');

const MainTabScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const [file, setFile] = useState(null);
  const [pdfViewerVisible, setPdfViewerVisibile] = useState(false)
  const [source, setSource] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfPage, setPdfPage] = useState(1);
  const [includedPages, setIncludedPages] = useState([]);

  const { state } = useContext(AuthContext);
  const dispatch = useDispatch();

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
                    setSelectedComponent('Home')
                  },
                })}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarStackScreen}
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
                    setSelectedComponent('Assignment')
                  },
                })}
            />
        </Tab.Navigator>
        
        <SelectSyllabus 
            onClose={() => { setModalVisible(!modalVisible); }}
            modalVisible={modalVisible} 
            onPress={() => {
              FilePickerManager.showFilePicker(null, async (response) => {
              
                if (response.didCancel) {
                  console.log('User cancelled file picker');
                }
                else if (response.error) {
                  console.log('FilePickerManager Error: ', response.error);
                }
                else {
                  setFile(response);
                  setSource({ uri: response.path, cache: true })
                  setPdfViewerVisibile(true);
                  setModalVisible(false)
                }
              });
            }}
        />
        {pdfViewerVisible ? 
        <View style={styles.pdfContainer}>
          <Pdf
            source={source}
            trustAllCerts={false}
            onLoadComplete={(numberOfPages, filePath) => {
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(error) => {
              console.log(error);
            }}
            horizontal={true}
            enablePaging={true}
            page={pdfPage}
            style={styles.pdf}
          />
          <View style={styles.pdfControlsContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={() => {
                setPdfPage(currentPage - 1)
              }}>
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>
            <View style={styles.pageCounter}>
              <Text>{currentPage}/{totalPages}</Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => {
                setPdfPage(currentPage + 1)
              }}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pageIncludedContainer}>
            <Text>{includedPages.length} out of {totalPages} Pages included</Text>
          </View>
          <View style={styles.dispatchControlsContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              setIncludedPages([]);
              setPdfPage(1);
              setPdfViewerVisibile(false)
            }}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>

            <TouchableOpacity style={styles.includeButton} onPress={() => {
              let pages = includedPages;
              if(includedPages.indexOf(currentPage) < 0)
                pages.push(currentPage);
              setIncludedPages(pages);
              setPdfPage(currentPage + 1);
            }}><Text style={styles.buttonText}>Include</Text></TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={async () => {
              const pdfData = await RNFS.readFile(file.path, 'base64');
              const pdfDoc = await PDFDocument.load(pdfData);
              let pages = includedPages;
              pages.sort();
              pages.reverse();
              for(let i = totalPages-1; i >= 0; i--) {
                if(includedPages.indexOf(i+1) < 0) {
                  pdfDoc.removePage(i);
                }
              }
              const base64String = await pdfDoc.saveAsBase64(); // CALL API
              // call confidence score screen
            }}><Text style={styles.buttonText}>Save</Text></TouchableOpacity>
          </View>
        </View>
        : null }
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
