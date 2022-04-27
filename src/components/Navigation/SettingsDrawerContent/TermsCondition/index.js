import React, { useContext } from 'react';
import { View,Text,SafeAreaView,Image, TouchableOpacity } from 'react-native';
import label from '../../../../styles/label'
import color from '../../../../styles/colors'
import styles from './styles'
import Modal from "react-native-modal";
import {Context as AuthContext} from '../../../../components/Context/AuthContext';


const TermsConditionModal = props => {
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
                        <Text style={[label.boldSmallHeading2, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Terms & Conditions</Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldSmallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Liability</Text>
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                            Content available on iubenda.com (http://www.iubenda.com/) and documents generated using the Service
                            are intended for general information purposes only. Although all clauses amd provisions inside the
                            generator database have been drafted by a team of highly qualified legal experts and regularly undergo
                            reviews and updates, documents are generated in a fully automated manner and therefore do not constitute
                            or substitute the rendering of legal advice, nor does any assistance and customer support provided by
                            iubenda establish an attorney-client relationship. This is why, despite all efforts in offering the best
                            possible service, iubenda cannot guarantee generated documents to be fully compliant with applicable law.
                            Users should therefore not rely upon documents generated using iubenda without seeking legal advice from
                            an attorney licensed in the relevant jurisdiction(s).
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default TermsConditionModal;
