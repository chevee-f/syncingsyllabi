import React, {useContext} from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import styles from './styles'
import Moment from 'moment';
import {Context as AuthContext} from '../../../components/Context/AuthContext';

const Goals = props => {
    const { state } = useContext(AuthContext);
    const tomorrow = Moment().add(1, 'days');

    return (
        <View>
            <View style={styles.header}>
              <Text style={[label.boldSmallHeading2,{color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>Goals</Text>
              <MenuIcon 
                  name="dots-vertical"
                  color={state.isDarkTheme === 'true' ? color.default : color.primary}
                  size={28}
              />
            </View>
            {props.goals.map((item) => {
                    return (
                        <View key={Math.random()} style={styles.container}>
                            <ImageBackground source={require('../../../assets/backgrounds/fetti.png')} resizeMode="cover" style={styles.backgroundImage}>
                            <View style={{ width: 200}}>
                                <Text style={[label.boldSmallHeading2,{color:'#fbe206',marginBottom:5}]}>{item.goalTitle.length > 25 ? item.goalTitle.slice(0, 25) + '...' : item.goalTitle} | {item.goalTypeName}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Icon 
                                        name="clock"
                                        color={item.isDue ? color.error : '#011232cc'}
                                        size={23}
                                    />
                                    <Text style={[label.boldExtraSmallHeading, {color: Moment(item.goalDateEnd).format("MM/DD/YYYY") === Moment(tomorrow).format("MM/DD/YYYY") ? color.error : '#000', marginLeft: 5}]}>
                                        {Moment(item.goalDateEnd).format("MM/DD/YYYY") === Moment(tomorrow).format("MM/DD/YYYY") ?
                                        'Due Tomorrow' : Moment(item.goalDateEnd).format("MM/DD/YYYY")}
                                    </Text>
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
