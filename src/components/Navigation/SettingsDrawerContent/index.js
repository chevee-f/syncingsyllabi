import React, { useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../Context/AuthContext';
import Icons from 'react-native-vector-icons/Entypo';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import method from './method'
import { getNavigationDrawerHome } from '../RootNavigation';
import About from './About'
import PrivacyPolicy from './PrivacyPolicy'
import TermsCondition from './TermsCondition'
import FastImage from 'react-native-fast-image'

export function SettingsDrawerContent (props) {
    const { state } = useContext(AuthContext);

    const { user } = useSelector(state => state.userReducer);
    const navigationDrawerHome = getNavigationDrawerHome()
   
    const {
        data,
        aboutModalVisible,
        privacyPolicyModalVisible,
        termsConditionModalVisible,
        isDarkTheme,
        imageLoading,
        setImageLoading,
        toggleTheme,
        setTermsConditionModalVisible,
        setPrivacyPolicyModalVisible,
        setAboutModalVisible
    } = method();

    return(
        <View style={styles.drawer}>
           <DrawerContentScrollView {... props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <TouchableOpacity onPress={() => navigationDrawerHome.navigate('ProfileScreen')}>
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
                            <View style={[styles.section, {width: 50}]}>
                                <Text style={[label.boldExtraSmallHeading2, { color: color.textDefault, textAlign:'center' }]}>Coming Soon</Text>
                                <Caption style={[label.extraSmallHeading2, styles.text ]}>Friends</Caption>
                            </View>      
                        </View>
                        <View style={styles.horizontalLine} />
                    </View>

                   <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/CaretRight.png')} style={{transform: [{ rotate: '180deg' }]}} />)}
                            label="Back" 
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => navigationDrawerHome.closeDrawer()}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/LockKey.png')}/>)}
                            label="Change Password"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('ChangePasswordScreen')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/SpeakerHigh.png')}/>)}
                            label="Sounds and Vibration"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('SoundsVibrationScreen')}}
                        />
                        <DrawerItem 
                            //icon={() => (<Image source={require('../../../assets/icons/moon.png')}/>)}
                            label=""
                            icon={() => (<View style={{flexDirection:'row'}}>
                                            <Image source={require('../../../assets/icons/moon.png')}/>
                                            <Text style={[label.extraSmallHeading3, styles.drawerText]}>
                                                Dark Mode
                                            </Text>
                                            <Switch
                                                trackColor={{ false: color.textDefault, true: color.textDefault }}
                                                thumbColor={isDarkTheme ? color.primary : color.textDefault}
                                                onValueChange={toggleTheme}
                                                value={isDarkTheme}
                                                style={styles.switch}
                                            />
                                         </View>
                                        )} 
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/BellSimpleRinging.png')}/>)}
                            label="Notifications"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            //onPress={() => {props.navigation.navigate('ChangePasswordScreen')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/Info.png')}/>)}
                            label="About"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => setAboutModalVisible(true)}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/ShieldCheck.png')}/>)}
                            label="Privacy Policy"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => setPrivacyPolicyModalVisible(true)}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/ClipboardText.png')}/>)}
                            label="Terms and Conditions"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => setTermsConditionModalVisible(true)}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/Lifebuoy.png')}/>)}
                            label="Support"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                   </Drawer.Section>    
                   {/*
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>        
                   </Drawer.Section>
                   */}             
                </View>
           </DrawerContentScrollView>
           <Drawer.Section style={styles.bottomDrawerSection}>
                <Text style={[label.extraSmallHeading3, {color: color.textDefault}]}>v0.1</Text>     
           </Drawer.Section>

          <About 
            onClose={() => setAboutModalVisible(!aboutModalVisible)}
            isVisible={aboutModalVisible}
          />

          <PrivacyPolicy 
            onClose={() => setPrivacyPolicyModalVisible(!privacyPolicyModalVisible)}
            isVisible={privacyPolicyModalVisible}
          />

          <TermsCondition
            onClose={() => setTermsConditionModalVisible(!termsConditionModalVisible)}
            isVisible={termsConditionModalVisible}
          />

        </View>
    )
}