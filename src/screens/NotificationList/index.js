import React, {useContext} from 'react';
import { Image, 
         Text, 
         View, 
         TouchableOpacity,
         ScrollView
       } from 'react-native';
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { removeUserNotification } from '../../actions/notification';
import {Context as AuthContext} from '../../components/Context/AuthContext';

const NotificationListScreen = ({navigation}) => {

    const { state } = useContext(AuthContext);
    const { notification } = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch();

    let notificationList = notification.sort(function(a,b){
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

    const removeNotification = (notificationId) => {
        let userId = state.userId
        let token = state.token
        dispatch(removeUserNotification(notificationId, userId, token));
    }

    const removeAllNotification = () => {
        let userId = state.userId
        let token = state.token
        let notifications = notification
        for (let i = 0; i < notifications.length; i++) {
           dispatch(removeUserNotification(notifications[i].id, userId, token));
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.headerContainer]}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/icons/CaretRight.png')} style={{transform: [{ rotate: '180deg' }]}} />
                    </TouchableOpacity>
                    <Text style={[label.boldLargeHeading, styles.headerText]}>
                        Notifications
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={removeAllNotification} style={styles.clearContainer}>
                <Text style={styles.clearAll}>CLEAR ALL</Text>
            </TouchableOpacity>
            <ScrollView>
                {notificationList.map((item) => {
                    return (
                        <TouchableOpacity style={[styles.messageContainer, {borderBottomColor: item.isRead ? color.default : color.primary}]} 
                                          onPress={() => navigation.navigate('Assignment')}>
                            {!item.isRead &&
                                <View style={styles.newIndicator} />
                            }
                            <View style={styles.content}>
                                <Text style={[styles.message, {color: item.isRead ? color.default : color.primary }]}>
                                    {item.title}
                                </Text>
                                <View style={styles.dueDateContainer}>
                                    <EvilIcons name="clock" size={24} color={color.primary} />
                                    <Text style={[styles.message, {color: item.isRead ? color.default : color.primary }]}>
                                        {item.message}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => removeNotification(item.id)}>
                                <Icon name="close" size={22} color={'#FF3333'} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                })}    
            </ScrollView>
        </View>
    )
}

export default NotificationListScreen;