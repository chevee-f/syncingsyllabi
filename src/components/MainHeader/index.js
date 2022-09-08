import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image'
import ForeGroundNotification from '../ForeGroundNotification'
import messaging from '@react-native-firebase/messaging';
import { getUserNotification, readUserNotification, removeUserNotification } from '../../actions/notification';
import {Context as AuthContext} from '../../components/Context/AuthContext';

var {height, width} = Dimensions.get('window');

const MainHeader = props => {

    const navigation = useNavigation()
    const { state } = useContext(AuthContext);
    const [imageLoading, setImageLoading] = useState(false);
    const { user } = useSelector(state => state.userReducer);
    const { notification } = useSelector(state => state.notificationReducer);
    
    const [badgeCount, setBadgeCount] = useState(0);
    const [modalForegroundVisible, setModalForegroundVisible] = useState(false);

    const dispatch = useDispatch();
    
    useEffect(() => {
        let userId = state.userId
        let token = state.token
        dispatch(getUserNotification(userId, token));
        setBadgeCount(notification.filter(x => x.isRead === false).length)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            let unreadNotification = notification.filter(x => x.isRead === false).length
            setBadgeCount(unreadNotification + 1)
        });
        return unsubscribe;
    }, [notification.length]);

    const readNotifications = () => {
        setModalForegroundVisible(false)
        let userId = state.userId
        let token = state.token
        let notifications = notification
        for (let i = 0; i < notifications.length; i++) {
            if(!notifications[i].isRead) dispatch(readUserNotification(notifications[i].id, userId, token));
        }
    }

    const navigateNotification = (notificationId, notificationTitle) => {
        let userId = state.userId
        let token = state.token
        dispatch(readUserNotification(notificationId, userId, token));
        setModalForegroundVisible(false)

        let res = notificationTitle.search("Assignment");
        res === -1 ? navigation.navigate('Goal') : navigation.navigate('Assignment')    
    }

    const removeNotification = (notificationId) => {
        let userId = state.userId
        let token = state.token
        dispatch(removeUserNotification(notificationId, userId, token));
    }

    return (
        <View style={[styles.headerContainer,{height: Platform.OS === 'ios' ? height * 0.21 : height * 0.23}]}>
            <View>
                <View style={styles.topLineContainer}>
                    <Image 
                        source={require('../../assets/carousel/TopLines.png')}
                        resizeMode='contain'
                        style={{width: width * 0.92,height: height * 0.6}}
                    />
                </View>
                <View style={styles.bottomLineContainer}>
                    <Image 
                        source={require('../../assets/carousel/BottomLines.png')}
                        resizeMode='contain'
                        style={{width: width * 0.75,height: height * 0.25 }}
                    />
                </View>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={{ justifyContent:'center' }}>
                            <TouchableOpacity 
                                style={styles.avatarContainer}
                                onPress={() => navigation.navigate('ProfileScreen')}>
                                    {imageLoading ? <Avatar.Image size={68} source={require('../../assets/load-loading.gif')} /> : null}
                                    <FastImage
                                        style={{height: imageLoading ? 1 : 68, 
                                                width: imageLoading ? 1 : 68,
                                                borderRadius: 10
                                            }} 
                                        source={{uri: user.imageUrl === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU' :
                                                      user.imageUrl,
                                                priority: FastImage.priority.high}} 
                                        onLoadStart={() => setImageLoading(true)}
                                        onLoadEnd={() => setImageLoading(false)}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={[label.mediumHeading,{color:color.textDefault}]}>Hello</Text>
                            <Text style={[label.boldMediumHeading,{color:color.textDefault}]}>{user.firstName} {user.lastName} 👋</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={styles.notificationContainer} onPress={() => setModalForegroundVisible(true)}>
                            <Icon name="notifications-outline" color={color.textDefault} size={32} />
                        </TouchableOpacity>
                        {badgeCount > 0 &&
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeCount}>{badgeCount}</Text>
                            </View>
                        }
                        <View style={styles.menuContainer}>
                            <Icon.Button name="ios-menu" size={40} backgroundColor='transparent' onPress={() => {navigation.openDrawer()}} />
                        </View>
                    </View>
                </View>
            </View>
            <ForeGroundNotification onClose={() => readNotifications()} 
                                    navigate={navigateNotification}
                                    remove={removeNotification}
                                    isVisible={modalForegroundVisible} 
                                    notifications={notification}
                                    setModalForegroundVisible={setModalForegroundVisible}
                                    />
        </View>
    );
};

export default MainHeader;
