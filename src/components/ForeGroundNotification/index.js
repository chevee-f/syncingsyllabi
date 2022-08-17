import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import Triangle from '../Triangle'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import color from '../../styles/colors'

const ForeGroundNotification = ({
    ...props
}) => {
    const TriangleUp = () => {
        return <Triangle style={styles.triangleUp} />;
    };

    const onTrigger = (id, title) => {
        props.navigate(id, title);
    }

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
                    {props.notifications.map((item) => {
                        return (
                            <TouchableOpacity style={[styles.messageContainer, {borderBottomColor: item.isRead ? color.default : color.primary}]} 
                                              onPress={() => onTrigger(item.id, item.title)}>
                                <View style={styles.newIndicator} />
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
                                <TouchableOpacity onPress={props.onClose}>
                                    <Icon name="close" size={22} color={'#FF3333'} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        );
                    })}    
                    </ScrollView>
                    <View>
                        <Text style={styles.seeAll}>SEE ALL</Text>
                    </View>
                </View>                                             
            </Modal>
        </SafeAreaView>
    );
};

export default ForeGroundNotification;
