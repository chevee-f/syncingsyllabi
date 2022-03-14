import React from 'react';
import { Text, View, Dimensions, TouchableOpacity,SafeAreaView } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Triangle from '../../../components/Triangle'
import Icon from 'react-native-vector-icons/Ionicons';
import label from '../../../styles/label'
import color from '../../../styles/colors'

var {height, width} = Dimensions.get('window');

const SelectSyllabus = ({
    onPress,
    ...props
  }) => {
    const TriangleDown = () => {
        return <Triangle style={styles.triangleDown} />;
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
          style={styles.modal}
          onBackButtonPress={props.onClose}
          onBackdropPress={props.onClose}>

            <View style={styles.modalContainer}>
              <Text style={[label.smallHeading2, {color:color.primary}]}>Add new Syllabus with your camera or from your photos</Text>
              <View style={styles.sourceContainer}>
                    <TouchableOpacity style={styles.source}>
                        <Icon 
                            name="camera-outline"
                            color={color.textDefault}
                            size={50}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source}>
                        <Icon 
                            name="image-outline"
                            color={color.textDefault}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TriangleDown />
          </Modal>
      </SafeAreaView>
            
        
    )
}

export default SelectSyllabus;