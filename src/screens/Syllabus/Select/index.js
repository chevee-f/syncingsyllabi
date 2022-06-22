import React from 'react';
import { Text, View, Dimensions, TouchableOpacity,SafeAreaView } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Triangle from '../../../components/Triangle'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import label from '../../../styles/label'
import color from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native';

var {height, width} = Dimensions.get('window');

const SelectSyllabus = ({
    onPress,
    ...props
  }) => {
    const navigation = useNavigation();
    const TriangleDown = () => {
        return <Triangle style={styles.triangleDown} />;
    };

    const ScanSyllabi = () => {
        props.onClose()
        navigation.navigate('LoadingScreen', {previousScreen: 'Syllabus'})
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
                    <TouchableOpacity style={styles.source} onPress={() => ScanSyllabi()}>
                        <Icon 
                            name="camera-outline"
                            color={color.textDefault}
                            size={45}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={() => ScanSyllabi()}>
                        <Icon 
                            name="image-outline"
                            color={color.textDefault}
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.source} onPress={onPress}>
                        <Icon2 
                            name="pdffile1"
                            color={color.textDefault}
                            size={30}
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