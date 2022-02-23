import React, {useEffect} from 'react';
import { StyleSheet, View, Dimensions, Text, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-paper';
import color from '../styles/colors'
import label from '../styles/label'

var {height, width} = Dimensions.get('window');

const MainHeader = props => {
 
    return (
        <View style={styles.headerContainer}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../assets/carousel/BottomLines.png')}
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

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: color.primary,
        height: Platform.OS === 'ios' ? height * 0.21 : height * 0.28,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
      },
      topLineContainer:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:Platform.OS === 'ios' ? height * -0.27 : height * -0.32,
        width:'55%'
      },
      topLineImage:{
          height:height * 0.6,
          width:width * 0.92
      },
      bottomLineContainer:{
          position:'absolute',
          alignSelf:'flex-start',
          marginTop: Platform.OS === 'ios' ? height * -0.002 : height * 0.07,
          marginLeft:width * -0.32
      },
      bottomLineImage:{
          height:height * 0.25,
          width:width * 0.75,
      },
      container:{
        flexDirection:'row',
        marginHorizontal:20
      },
      profileContainer:{
        flexDirection:'row',
        marginTop:25
      },
      avatarContainer:{
        height:68,
        alignItems:'center',
        width: 68,
        overflow: 'hidden', 
        borderColor: color.textDefault,
        borderWidth: 4,
        borderRadius: 50
      },
      nameContainer:{
        justifyContent:'center',
        marginLeft:10,
        width: 135
      },
      notificationContainer:{
        justifyContent:'center',
        alignItems:'flex-end', 
        width: width * 0.32
      },
      menuContainer:{
        height:200,
        justifyContent:'center',
        marginLeft:-5
      },
      rightContainer:{
        flexDirection:'row',
        marginTop:15,
        width: width * 0.5
      }
});

export default MainHeader;
