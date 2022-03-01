import React, {useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native' // <-- import useNavigation hook
import color from '../../styles/colors'
import label from '../../styles/label'
import styles from './styles'

const MainHeader = props => {

    const navigation = useNavigation()

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../../assets/carousel/BottomLines.png')}
                    resizeMode='contain'
                    style={styles.bottomLineImage}
                />
            </View>

            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={{ justifyContent:'center' }}>
                        <View style={styles.avatarContainer}>
                            <Avatar.Image 
                                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}}
                                size={68}
                            />
                        </View>
                        
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={[label.mediumHeading,{color:color.textDefault}]}>Hello</Text>
                        <Text style={[label.boldLargeHeading,{color:color.textDefault}]}>John Doe 👋</Text>
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
    );
};

export default MainHeader;
