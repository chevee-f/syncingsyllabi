import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    TouchableRipple,
    Switch
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

export function DrawerContent (props) {
    const {state, signOut} = useContext(AuthContext);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userReducer);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return(
        <View style={styles.drawer}>
           <DrawerContentScrollView {... props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'
                            }}
                            size={70}
                        />
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
                            <View style={styles.section}>
                                <Text style={[label.boldLargeHeading, { color: color.textDefault }]}>3</Text>
                                <Caption style={[label.extraSmallHeading2, styles.text ]}>Classes</Caption>
                            </View>
                            <View style={styles.section}>
                                <Text style={[label.boldLargeHeading, { color: color.textDefault }]}>3</Text>
                                <Caption style={[label.extraSmallHeading2, styles.text ]}>Goals</Caption>
                            </View>
                            <View style={styles.section}>
                                <Text style={[label.boldLargeHeading, { color: color.textDefault }]}>7</Text>
                                <Caption style={[label.extraSmallHeading2, styles.text ]}>Friends</Caption>
                            </View>
                        </View>
                        <View style={styles.horizontalLine} />
                    </View>

                   <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/CalendarWhite.png')}/>)}
                            label="Calendar"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/GraduationCap.png')}/>)}
                            label="Goals"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/Note.png')}/>)}
                            label="Assignments"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/FilePlus.png')}/>)}
                            label="Add a Class"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/Gear.png')}/>)}
                            label="Settings"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Setting')}}
                        />
                        <DrawerItem 
                            icon={() => (<Image source={require('../../../assets/icons/UserCircle.png')}/>)}
                            label="User Profile"
                            labelStyle={[label.extraSmallHeading3, {color: color.textDefault, marginLeft: -25}]}
                            onPress={() => {props.navigation.navigate('Home')}}
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
              {/** <Text style={[label.extraSmallHeading3, {color: color.textDefault}]}>v0.1</Text> 
              **/}
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
        </View>
    )
}