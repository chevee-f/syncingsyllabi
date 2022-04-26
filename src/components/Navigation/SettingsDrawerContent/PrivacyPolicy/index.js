import React, { useContext } from 'react';
import { View,Text,SafeAreaView,Image, TouchableOpacity } from 'react-native';
import label from '../../../../styles/label'
import color from '../../../../styles/colors'
import styles from './styles'
import Modal from "react-native-modal";
import {Context as AuthContext} from '../../../../components/Context/AuthContext';


const PrivacyPolicy = props => {
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
                        <Text style={[label.boldSmallHeading2, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Privacy Policy</Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>What is a privacy policy?</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            A privacy policy is a website's way of informing its users about how they ensure the protection
                            of privacy on their domain while processing data. Most websites use cookies and trackers that
                            process personal data from its users.
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>What is personal data?</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            Personal data is any kind of information that can identify a living individual, either directly
                            or indirectly. Personal data includes names, e-mails, addresses, location data, and online identifiers
                            such as IP-addresses, unique IDs, search and browser history.
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>What are the GDPR privacy policy requirements?</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            The EU's General Data Protection Regulation (GDPR) requires that your website has an independent page for its
                            privacy policy that is easily accessible for users. A privacy policy must include what information your website
                            collects from users, what methods it uses to collect this information (e.g. cookies).
                        </Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>What cookies does my website use?</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            Most websites use cookies, and a lot use third-part cookies, e.g. by implementing social media plugins, analytics
                            tools and marketing software. Third-party cookies will process personal data from users and share it with ad tech
                            companies. To know exactly what cookies your website uses, you must perform scans of your domain. 
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;
