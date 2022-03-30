import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Email from 'react-native-vector-icons/EvilIcons';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import EditProfile from './Edit'
import DefaultButton from '../../components/DefaultButton'
import styles from './styles'
import color from '../../styles/colors'
import label from '../../styles/label'
import Moment from 'moment';

var {height, width} = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {

    const {user} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const data = [
        {
            title: 'Classes',
            count: '3'
        },{
            title: 'Goals',
            count: '3'
        },{
            title: 'Friends',
            count: '7'
        },
    ];

    useEffect(() => {
    }, [user]);

    return (
      <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-thin-left" color={color.primary} size={20} />
              </TouchableOpacity>
              <Text style={[label.boldMediumHeading, styles.headerText]}>Profile</Text>
          </View>
          <View style={{alignItems:'center'}}>
              <ImageBackground 
                  source={require('../../assets/backgrounds/ProfileBackground.png')} 
                  style={styles.backgroundImage}>
                      <Avatar.Image 
                          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}}
                          size={height * 0.28}
                      />
                      <Image 
                          source={require('../../assets/icons/CameraGroup.png')}
                          resizeMode='contain'
                          style={styles.cameraImage}
                      />
              </ImageBackground>
          </View>
        <View style={{ marginTop: height * 0.38 }}>
            <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
            <View style={styles.row}>
                <Icon name="location-pin" color={color.default} size={18} />
                <Text style={[label.boldSmallHeading, { color: color.primary, marginLeft: 5 }]}>
                    {user.school}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.countContainer}>
                    {data.map((item) => {
                          return (
                              <View>
                                <Text style={[ label.smallHeading, styles.title ]}>
                                    {item.title}
                                </Text>
                                <Text style={[label.boldExtraLargeHeading, styles.count ]}>
                                    {item.count}
                                </Text>
                              </View>
                          );
                      })                
                    }   
                </View>
            </View>
            <Text style={[label.boldMediumHeading, { color: color.primary, marginBottom: 10 }]}>Basic Information</Text>
            <View style={styles.emailContainer}>
                <Email name="envelope" color={color.default} size={30} />
                <Text style={[label.smallHeading2, {color: color.primary}]}>{user.email}</Text>
            </View>
                <Text style={[label.smallHeading2, styles.info ]}>Birthdate: {user.dateOfBirth !== null ? Moment(user.dateOfBirth).format("MM/DD/YYYY") : ''}</Text>
                <Text style={[label.smallHeading2, styles.info ]}>Major: {user.major}</Text>

            <View style={{marginTop:height * 0.05}}>
                <DefaultButton 
                    title="Edit Profile" 
                    onPress={() => setModalVisible(true)}
                />
            </View>         
            
        </View>

        <EditProfile 
            onClose={() => { setModalVisible(!modalVisible); }}
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible}
        />
            
      </View>
    )
}

export default ProfileScreen;