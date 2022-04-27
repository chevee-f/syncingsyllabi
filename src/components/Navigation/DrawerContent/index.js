import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../Context/AuthContext';
import Icons from 'react-native-vector-icons/Entypo';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import method from './method'
import AddSyllabus from '../../../screens/Syllabus/Add'
import { getNavigationDrawerHome } from '../RootNavigation';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

export function DrawerContent (props) {
    const navigation = useNavigation()
    const {state, signOut} = useContext(AuthContext);

    const navigationDrawerHome = getNavigationDrawerHome()
    const { user } = useSelector(state => state.userReducer);
    const {
        data,
        modalVisible,
        syllabusId,
        imageLoading,
        setImageLoading,
        setSyllabusId,
        setModalVisible
    } = method();

    return(
        <View style={styles.drawer}>
           <DrawerContentScrollView {... props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            {imageLoading ? <Avatar.Image size={70} source={require('../../../assets/load-loading.gif')} /> : null}
                            <FastImage
                                style={{height: imageLoading ? 1 : 70, 
                                        width: imageLoading ? 1 : 70,
                                        borderRadius: 120
                                    }} 
                                source={{uri: user.imageUrl === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU' :
                                            user.imageUrl,
                                        priority: FastImage.priority.high}} 
                                onLoadStart={() => setImageLoading(true)}
                                onLoadEnd={() => setImageLoading(false)}
                            />
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <View style={{flexDirection:'column'}}>
                                <Title style={[label.boldExtraLargeHeading, { color: color.textDefault }]}>{user.firstName} {user.lastName}</Title>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Icons name="location-pin" color={color.default} size={18} />
                                    <Caption style={[label.extraSmallHeading2, { color: color.textDefault, fontSize:12 }]}>{user.school}</Caption>
                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            {data.map((item) => {
                                return (
                                    <View style={styles.section}>
                                        <Text style={[label.boldLargeHeading, { color: color.textDefault }]}>{item.count}</Text>
                                        <Caption style={[label.extraSmallHeading2, styles.text ]}>{item.title}</Caption>
                                    </View>
                                    );
                                })                
                            }   
                        </View>
                        <View style={styles.horizontalLine} />
                    </View>

                   <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/CalendarWhite.png')}/>)}
                            label="Calendar"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('MainTabScreen', {screen: 'Calendar'})}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/GraduationCap.png')}/>)}
                            label="Goals"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('MainTabScreen', {screen: 'Goal'})}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/Note.png')}/>)}
                            label="Assignments"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('MainTabScreen', {screen: 'Assignment'})}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/FilePlus.png')}/>)}
                            label="Add a Class"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {setModalVisible(true)}}
                        />
                        <DrawerItem 
                            icon={() => (<View style={{flexDirection:'row'}}>
                                            <Image source={require('../../../assets/icons/Gear.png')}/>
                                            <Text style={[label.extraSmallHeading3, styles.settingsText]}>
                                                Settings
                                            </Text>
                                            <Image source={require('../../../assets/icons/CaretRight.png')}/>
                                         </View>
                                        )}
                            label=""
                            //labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => navigationDrawerHome.openDrawer()}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/UserCircle.png')}/>)}
                            label="User Profile"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                   </Drawer.Section>    
                </View>
           </DrawerContentScrollView>
           <Drawer.Section style={styles.bottomDrawerSection}>
              {/** <Text style={[label.extraSmallHeading3, {color: color.textDefault}]}>v0.1</Text> **/}
                    <DrawerItem 
                        icon={({color,size}) => (
                            <Icon 
                                name="exit-to-app"
                                color='#fff'
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                        onPress={signOut} 
                    />           
            </Drawer.Section>

            <AddSyllabus 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
                syllabusId={syllabusId}
                setSyllabusId={setSyllabusId}
            />
        </View>
    )
}