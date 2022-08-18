import React, {useEffect} from 'react';
import { Image, 
         Text, 
         View, 
         TouchableOpacity,
         ScrollView
       } from 'react-native';
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import { useSelector } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';

const NotificationListScreen = ({navigation}) => {
    const { notification } = useSelector(state => state.notificationReducer);
    let notificationList = notification.sort(function(a,b){
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    });
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
            <View style={styles.clearContainer}>
                <Text style={styles.clearAll}>CLEAR ALL</Text>
            </View>
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
                            <TouchableOpacity //onPress={props.onClose}
                            >
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