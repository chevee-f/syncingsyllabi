import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native';
import method from './method';
import Triangle from '../../../components/Triangle'

const SelectSyllabus = ({
    onPress,
    ...props
  }) => {
      
    const navigation = useNavigation();
    const {
        openCamera,
        selectPdf,
        selectImage
    } = method(navigation,props);

    const TriangleDown = () => {
        return <Triangle style={[styles.triangleDown, {...props.triangleTransform}]} />;
    };

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
            <View style={[styles.modalContainer, {...props.modalContainer}]}>
              <Text style={[label.smallHeading2, {color:color.primary}]}>Add new Syllabus with your camera or from your photos</Text>
              <View style={styles.sourceContainer}>
                    <TouchableOpacity style={styles.source} onPress={() => openCamera(props.nextScreen)}>
                        <Icon 
                            name="camera-outline"
                            color={color.textDefault}
                            size={45}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={() => selectImage(props.nextScreen)}>
                        <Icon 
                            name="image-outline"
                            color={color.textDefault}
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={() => selectPdf(props.nextScreen)}>
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