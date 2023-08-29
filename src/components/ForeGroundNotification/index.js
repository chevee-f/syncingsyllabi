import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import Triangle from '../Triangle'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import color from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'

const ForeGroundNotification = ({
    setModalForegroundVisible,
    ...props
}) => {

    const navigation = useNavigation()
    const TriangleUp = () => {
        return <Triangle style={styles.triangleUp} />;
    };

    const onTrigger = (id, title) => {
        props.navigate(id, title);
    }

    const onRemove = (id) => {
        props.remove(id);
    }

    const seeAll = () => {
        setModalForegroundVisible(false)
        navigation.navigate('NotificationListScreen')
    }
   
    let notificationList = props.notifications.sort(function(a,b){
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    });

    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropColor='transparent'
                isVisible={props.isVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>
            <TriangleUp />        
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Notifications</Text>
                    </View>
                    <ScrollView>
                    {notificationList.map((item) => {
                        return (
                            <TouchableOpacity key={Math.random()} style={[styles.messageContainer, {borderBottomColor: item.isRead ? color.default : color.primary}]} 
                                              onPress={() => onTrigger(item.id, item.title)}>
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
                                <TouchableOpacity onPress={() => onRemove(item.id)}>
                                    <Icon name="close" size={22} color={'#FF3333'} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        );
                    })}    
                    </ScrollView>
                    <TouchableOpacity onPress={seeAll}>
                        <Text style={styles.seeAll}>SEE ALL</Text>
                    </TouchableOpacity>
                </View>                                             
            </Modal>
        </SafeAreaView>
    );
};

export default ForeGroundNotification;
