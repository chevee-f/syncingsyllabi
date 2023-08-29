import React, {useEffect, useContext, useState} from 'react';
import { View,Text,SafeAreaView } from 'react-native';
import label from '../../styles/label';
import styles from './styles';
import Modal from "react-native-modal";
import DefaultButton from '../../components/DefaultButton';
import CancelButton from '../../components/SecondaryButton';
import DefaultInput from '../../components/DefaultInput';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { Context as AuthContext } from '../../components/Context/AuthContext';
import { 
    deleteUser
  } from '../../actions/user';
import NotAvailableModal from '../NotAvailableModal';

const DeleteAccountModal = props => {
    const [buttonText, setButtonText] = useState('Proceed');
    const [fieldVisible, setFieldVisible] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess]= useState(false);
    const [notAvailableModalVisible, setNotAvailableModalVisible] = useState(false);
    const { state } = useContext(AuthContext);
    const dispatch = useDispatch();

    const closeModal = () => {
        setFieldVisible(false);
        setButtonText('Proceed');
        setConfirmText('');
        setHasError(false);
        props.onClose();
    }

    const handleDeleteAccount = async () => {
        let userId = state.userId;
            let token = await AsyncStorage.getItem('userToken');
            await dispatch(deleteUser(token, userId, false));

            setTimeout(() => {
                setIsDeleteSuccess(true);
                setTimeout(() => {
                    setIsDeleteSuccess(false);
                    setIsSaving(false);
                    props.doneDelete();
                    props.onClose();
                }, 3000);
            }, 2000);
    }

    const handleProceedDelete = () => {
        if(state.userId) {
            if(buttonText == 'Delete') {
                if(confirmText == 'DELETE') {
                    console.log("DELETIN PROFILE")
                    setHasError(false);
                    setIsSaving(true);
                    handleDeleteAccount();
                }
                else {
                    console.log("WRONG THINGY")
                    setHasError(true);
                }
            } else {
                setFieldVisible(true);
                setButtonText('Delete');
            }
        } else {
            setNotAvailableModalVisible(true);
        }
    }

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
                    onBackButtonPress={closeModal}
                    onBackdropPress={closeModal}
                    hasBackdrop={!isSaving}
                    >

                    <View style={styles.modalContainer}>
                        {isDeleteSuccess ? 
                        <Text>Account successfully deleted. Redirecting to sign in/up...</Text>
                        :
                        <>
                        <Text style={label.boldMediumHeading}>{props.confirmationMessage}</Text>
                        {props.subText &&
                            <Text style={{fontSize: 16, marginTop: 10, textAlign: "center", lineHeight: 25}}>{props.subText}</Text>
                        }
                        {fieldVisible &&
                            <View style={{ width: '100%', marginTop: 40, marginBottom: -15}}>
                                <Text style={{ left: 0, top: -15,  position: 'absolute'}}>To confirm this type 'DELETE'</Text>
                                <DefaultInput disabled={isSaving} onChangeText={(text) => {
                                    setConfirmText(text);
                                }} style={{width: '100%'}} title={confirmText} />
                                {hasError &&
                                    <Text style={{fontStyle: 'italic', color: 'red', fontSize: 15, letterSpacing: 1}}>Confirmation message is Case Sensitive</Text>
                                }
                            </View>
                        }
                        <View style={styles.buttonContainer}>
                            {isSaving ? 
                                <View style={{ width: '100%' }}>
                                    <ActivityIndicator size="small" color={'#0036A1'} />
                                </View>
                                :
                                <>
                                    <CancelButton title="Close" containerStyle={styles.button} onPress={closeModal} />
                                    <DefaultButton title={buttonText} buttonColor={{backgroundColor: '#E54C29'}} containerStyle={styles.button} onPress={() => {
                                        handleProceedDelete()
                                        

                                    }} />
                                </>
                            }
                        </View>
                        </>
                        }
                    </View>
                    <NotAvailableModal 
                        isVisible={notAvailableModalVisible}
                        onClose={() => {setNotAvailableModalVisible(false)}}/>
                </Modal>
        </SafeAreaView>
    );
};

export default DeleteAccountModal;
