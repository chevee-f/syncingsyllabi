import React, {useEffect} from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import styles from './styles'

const Goals = props => {
 
    return (
        <View>
            <View style={styles.header}>
              <Text style={[label.boldSmallHeading2,{color:color.primary}]}>Goals</Text>
              <MenuIcon 
                  name="dots-vertical"
                  color={color.primary}
                  size={28}
              />
            </View>
            {props.goals.map((item) => {
                    return (
                        <View style={styles.container}>
                            <ImageBackground source={require('../../../assets/fetti.png')} resizeMode="cover" style={styles.backgroundImage} >
                            <View>
                                <Text style={[label.boldSmallHeading2,{color:'#fbe206',marginBottom:5}]}>{item.goal}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Icon 
                                        name="clock"
                                        color={item.isDue ? color.error : '#011232cc'}
                                        size={23}
                                    />
                                    <Text style={[label.boldSmallHeading,{color:`${item.isDue ? color.error : '#011232cc'}`,marginLeft:3}]}>{item.dateTime}</Text>
                                </View>
                            </View>
                            <Image 
                                    source={require('../../../assets/Saly2.png')}
                                    resizeMode='contain'
                                    style={styles.image}
                                />
                            </ImageBackground>
                        </View>
                    ); 
                })                
            }
        </View>
    );
};

export default Goals;
