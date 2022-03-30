import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import AddGoal from '../../screens/Goal/Add'
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import { useSelector } from 'react-redux';

var {height, width} = Dimensions.get('window');

const MainHeader = props => {

    const navigation = useNavigation()
    const [goalVisible, setGoalVisible] = useState(false);
    const { user } = useSelector(state => state.userReducer);

    return (
        <View style={[styles.headerContainer,{height: props.screen === 'Home' ? 
                                                      Platform.OS === 'ios' ? height * 0.21 : height * 0.28 :
                                                      Platform.OS === 'ios' ? height * 0.11 : height * 0.04}]}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={{width: props.screen === 'Home' ? width * 0.92 : width * 0.75,
                            height: props.screen === 'Home' ? height * 0.6 : height * 0.55 }}
                />
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../../assets/carousel/BottomLines.png')}
                    resizeMode='contain'
                    style={{width: props.screen === 'Home' ? width * 0.75 : width * 0.8,
                            height: props.screen === 'Home' ? height * 0.25 : height * 0.13 }}
                />
            </View>

            {props.screen === 'Goal' &&
                    <View style={styles.titleContainer}>
                        <Text style={[label.boldMediumHeading, {color: color.textDefault,textAlign:'right', width:'57%'}]}>Goals</Text>
                        <TouchableOpacity onPress={() => setGoalVisible(true)}>
                            <Icon name="add-outline" color={color.textDefault} size={40} />
                        </TouchableOpacity>
                    </View>
            }

            {props.screen === 'Home' &&
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={{ justifyContent:'center' }}>
                            <TouchableOpacity 
                                style={styles.avatarContainer}
                                onPress={() => navigation.navigate('ProfileScreen')}>
                                    <Avatar.Image 
                                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}}
                                        size={68}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={[label.mediumHeading,{color:color.textDefault}]}>Hello</Text>
                            <Text style={[label.boldMediumHeading,{color:color.textDefault}]}>{user.firstName} {user.lastName} 👋</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.notificationContainer}>
                            <Icon name="notifications-outline" color={color.textDefault} size={26} />
                        </View>
                        <View style={styles.menuContainer}>
                            <Icon.Button name="ios-menu" size={35} backgroundColor='transparent' onPress={() => {navigation.openDrawer()}} />
                        </View>
                    </View>
                </View>
            }

        <AddGoal 
            onClose={() => { setGoalVisible(!goalVisible); }}
            goalVisible={goalVisible} 
            setGoalVisible={setGoalVisible}
        />

        </View>
    );
};

export default MainHeader;
