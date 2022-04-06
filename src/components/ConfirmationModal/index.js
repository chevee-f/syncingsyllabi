import React, {useEffect} from 'react';
import { View,Text,SafeAreaView } from 'react-native';
import label from '../../styles/label'
import styles from './styles'
import Modal from "react-native-modal";
import DefaultButton from '../../components/DefaultButton'
import CancelButton from '../../components/SecondaryButton'

const ConfirmationModal = props => {
 

    return (
        <SafeAreaView>
                <Modal
                    useNativeDriver={true}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    backdropColor='rgba(0, 0, 0, 0.7)'
                    backdropOpacity={0.5}
                    isVisible={props.modalVisible}
                    hideModalContentWhileAnimating
                    style={styles.modal}
                    onBackButtonPress={props.onClose}
                    onBackdropPress={props.onClose}>

                    <View style={styles.modalContainer}>
                        <Text style={label.boldMediumHeading}>{props.confirmationMessage}</Text>
                        <View style={styles.buttonContainer}>
                            <CancelButton title="Close" containerStyle={styles.button} onPress={props.onClose} />
                            <DefaultButton title="Yes" containerStyle={styles.button} onPress={props.onConfirm} />
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
    );
};

export default ConfirmationModal;
