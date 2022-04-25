import React, {useEffect} from 'react';
import { View,Text,SafeAreaView,Image } from 'react-native';
import label from '../../styles/label'
import styles from './styles'
import Modal from "react-native-modal";
import CloseButton from '../../components/SecondaryButton'


const SuccessModal = props => {
    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                isVisible={props.successModalVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={styles.modalContainer}>
                    <Image 
                        source={props.isRemove ? require('../../assets/icons/Remove.png') : require('../../assets/carousel/Goals.png')}
                        resizeMode='contain'
                        style={styles.image}
                    />
                    <Text style={[label.boldMediumHeading,{marginVertical:20}]}>
                        {//props.isRemove ? 'Success' : 'Congratulations!'
                         props.headerText}
                    </Text>
                    <Text style={[label.smallHeading2,{textAlign:'center'}]}>
                        {props.successMessage}
                    </Text>
                    <CloseButton 
                        title='Close'
                        containerStyle={styles.closeButton}
                        onPress={props.onClose}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default SuccessModal;
