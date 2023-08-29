import React, {useContext} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native';
import method from './method';
import Triangle from '../../../components/Triangle';
import NotAvailableModal from '../../../components/NotAvailableModal';

import {Context as AuthContext} from '../../../components/Context/AuthContext';

const SelectSyllabus = ({
    onPress,
    ...props
  }) => {
    const {state, signIn, signUp} = useContext(AuthContext);
    const navigation = useNavigation();
    const {
        openCamera,
        selectPdf,
        selectImage,
        notAvailableModalVisible,
        setNotAvailableModalVisible,
    } = method(navigation,props);

    const TriangleDown = () => {
        return <Triangle style={[styles.triangleDown, {...props.triangleTransform}]} />;
    };

    const openScan = (item) => {
        let userId = state.userId;
        if(userId) {
            if(item == 'camera') {
                openCamera(props.nextScreen);
            }

            if(item == 'image') {
                selectImage(props.nextScreen);
            }

            if(item == 'pdf') {
                selectPdf(props.nextScreen);
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
                backdropColor='transparent'
                isVisible={props.modalVisible}
                hideModalContentWhileAnimating
                style={[styles.modal, {...props.modal}]}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>
            {props.isSideModal &&
                <TriangleDown />
            }
            <NotAvailableModal 
                isVisible={notAvailableModalVisible}
                onClose={() => {setNotAvailableModalVisible(false)}} />
            <View style={[styles.modalContainer, {...props.modalContainer}]}>
              <Text style={[label.smallHeading2, {color:color.primary}]}>Add a new syllabus with your camera, photos, or a pdf</Text>
              <View style={styles.sourceContainer}>
                    <TouchableOpacity style={styles.source} onPress={() => openScan('camera')}>
                        <Icon 
                            name="camera-outline"
                            color={color.textDefault}
                            size={45}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={() => openScan('image')}>
                        <Icon 
                            name="image-outline"
                            color={color.textDefault}
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={() => openScan('pdf')}>
                        <Icon2 
                            name="pdffile1"
                            color={color.textDefault}
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {!props.isSideModal &&
                <TriangleDown />
            }
            
            </Modal>
      </SafeAreaView>
    )
}

export default SelectSyllabus;