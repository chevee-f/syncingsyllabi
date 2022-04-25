import React, { useContext } from 'react';
import { View,Text,SafeAreaView,Image, TouchableOpacity } from 'react-native';
import label from '../../../../styles/label'
import color from '../../../../styles/colors'
import styles from './styles'
import Modal from "react-native-modal";
import {Context as AuthContext} from '../../../../components/Context/AuthContext';


const AboutModal = props => {
    const { state } = useContext(AuthContext);
    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                isVisible={props.isVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={[styles.modalContainer,{backgroundColor: state.isDarkTheme === 'true' ? '#000' : '#fff'}]}>
                    <TouchableOpacity onPress={props.onClose}>
                        <Image 
                            source={require('../../../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>About</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary, marginTop: 10}]}>
                            An app that can scan syllabi due date charts. The integrated scanning system will scan course syllabus data, sync, and
                            extract important due dates and automatically integrate them into the in-app calendar or the calendar of choice. Reminders
                            of important due dates will be created and sent to students on a timely basis to remind students of upcoming events. The
                            goal of Syncing Syllabi is to decrease a significant amount of manual input of syllabus data, create and set reminders for
                            students automatically, and to help students stay afloat during their semesters
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Address</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            Block 123 Apple Street California
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Contact Number</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            +123 456 7890
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Email Address</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            my@mail.com
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default AboutModal;
