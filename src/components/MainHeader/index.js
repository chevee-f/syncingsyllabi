import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'

var {height, width} = Dimensions.get('window');

const MainHeader = props => {

    const navigation = useNavigation()
    const [imageLoading, setImageLoading] = useState(false);
    const { user } = useSelector(state => state.userReducer);
    
    return (
        <View style={[styles.headerContainer,{height: Platform.OS === 'ios' ? height * 0.21 : height * 0.28}]}>
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
                        <View style={styles.notificationContainer}>
                            <Icon name="notifications-outline" color={color.textDefault} size={26} />
                        </View>
                        <View style={styles.menuContainer}>
                            <Icon.Button name="ios-menu" size={35} backgroundColor='transparent' onPress={() => {navigation.openDrawer()}} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MainHeader;
