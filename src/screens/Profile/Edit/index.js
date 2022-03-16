import React, { useState } from 'react';
import { View, 
         Text, 
         SafeAreaView,
         Image ,
         ScrollView
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import label from '../../../styles/label'
import color from '../../../styles/colors'
import DefaultInput from '../../../components/DefaultInput';
import DateTimePicker from '../../../components/DateTimePicker'
import Colors from '../../../components/GradientColor'
import DefaultButton from '../../../components/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';


const EditProfile = ({
    onPress,
    setModalVisible,
    modalVisible,
    ...props
  }) => {

    const [calendarVisible, setCalendarVisible] = useState(false);

    return (
        <SafeAreaView>
        <Modal
          useNativeDriver={true}
          backdropColor='rgba(0, 0, 0, 0.7)'
          backdropOpacity={0.5}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          //isVisible={props.modalVisible}
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          style={styles.modal}
          onBackButtonPress={props.onClose}
          onBackdropPress={props.onClose}>

            <View style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); }}>
                        <Image 
                            source={require('../../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close}
                        />
                    </TouchableOpacity>
                    <View style={{marginVertical: 10}}>
                        <Text style={[label.boldMediumHeading, { color: color.primary }]}>Edit Information</Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="First Name"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Last Name"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Email"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="School"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Date of Birth"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Major"
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultButton title="Update" onPress={() => { setModalVisible(!modalVisible); }} />       
                    </View>
                </ScrollView>
            </View>
            <DateTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
                showTimePicker={true}
            />
          </Modal>

      </SafeAreaView>
        
    )
}

export default EditProfile;