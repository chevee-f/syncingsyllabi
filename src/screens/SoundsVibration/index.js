import React, { useState, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles';
import color from './../../styles/colors'
import label from './../../styles/label'
import Slider from '@react-native-community/slider';
import {Context as AuthContext} from '../../components/Context/AuthContext';


const SoundsVibrationScreen = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [isVibrate, setIsVibrate] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleVibrateSwitch = () => setIsVibrate(previousState => !previousState);
    const { state } = useContext(AuthContext);

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.headerContainer]}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/icons/CaretRight.png')} style={{transform: [{ rotate: '180deg' }]}} />
                    </TouchableOpacity>
                    <Text style={[label.boldMediumHeading, styles.headerText]}>
                        Sound & Vibration
                    </Text>
                </View>
            </View>
            <View>
                <View style={{paddingVertical: 40}}>
                    <Text style={[label.extraSmallHeading3, {color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>Alert Volume</Text>
                    <Slider
                        maximumValue={100}
                        minimumValue={0}
                        minimumTrackTintColor={state.isDarkTheme === 'true' ? color.default : color.primary}
                        maximumTrackTintColor={color.light}
                        step={1}
                        value={15}
                        //value={this.state.sliderValue}
                        //onValueChange={(sliderValue) => this.setState({ sliderValue })}
                        style={styles.slider}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={[label.extraSmallHeading3, {color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>Alert Vibrations</Text>
                    <Switch
                        //trackColor={{ false: color.textDefault, true: "#81b0ff" }}
                        trackColor={{ false: color.textDefault, true: color.primary }}
                        thumbColor={isEnabled ? color.textDefault : color.primary}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={[label.extraSmallHeading3, {color:state.isDarkTheme === 'true' ? color.default : color.primary}]}>Vibrate on Silent</Text>
                    <Switch
                        trackColor={{ false: color.textDefault, true: color.primary }}
                        thumbColor={isVibrate ? color.textDefault : color.primary}
                        onValueChange={toggleVibrateSwitch}
                        value={isVibrate}
                        style={styles.switch}
                    />
                </View>
            </View>
        </View>
    )

};

export default SoundsVibrationScreen;