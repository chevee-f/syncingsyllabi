import React, { useState } from 'react';
import { View, 
         Text, 
         SafeAreaView,
         Image,
         ScrollView,
         Platform,
         KeyboardAvoidingView
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import label from '../../../styles/label'
import color from '../../../styles/colors'
import DefaultInput from '../../../components/DefaultInput';
import DateTimePicker from '../../../components/DateTimePicker'
import DefaultButton from '../../../components/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import method from './method'
import Moment from 'moment';

const EditProfile = ({
    onPress,
    setModalVisible,
    modalVisible,
    ...props
  }) => {

    const {
        profile,
        isLoading,
        inputValidation,
        selectedDate,
        setSelectedDate,
        setProfile,
        handleUpdateProfile,
        handleValidEmail
    } = method(setModalVisible);

    const [calendarVisible, setCalendarVisible] = useState(false);

    return (
        <SafeAreaView>
        <Modal
          useNativeDriver={true}
          backdropColor='rgba(0, 0, 0, 0.7)'
          backdropOpacity={0.5}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          style={styles.modal}
          onBackButtonPress={props.onClose}
          onBackdropPress={props.onClose}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={props.onClose}>
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
                            value={profile.firstName}
                            onChangeText={(firstName) =>  setProfile({...profile, firstName: firstName})}
                            hasValue={profile.firstName.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Last Name"
                            value={profile.lastName}
                            onChangeText={(lastName) =>  setProfile({...profile, lastName: lastName})}
                            hasValue={profile.lastName.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Email"
                            value={profile.email}
                            onChangeText={(email) =>  setProfile({...profile, email: email})}
                            hasValue={profile.email.length}
                            hasError={!inputValidation.isValidEmail}
                            errorMsg={inputValidation.emailErrMsg}
                            onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="School"
                            value={profile.school}
                            onChangeText={(school) =>  setProfile({...profile, school: school})}
                            hasValue={profile.school.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Date of Birth"
                            onPressIn={() => { setCalendarVisible(true)}}
                            editable={false}
                            value={profile.dateOfBirth !== null ? Moment(profile.dateOfBirth).format("MM/DD/YYYY") : ''}
                            hasValue={selectedDate !== '' || profile.dateOfBirth !== null}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultInput 
                            label="Major"
                            value={profile.major}
                            onChangeText={(major) =>  setProfile({...profile, major: major})}
                            hasValue={profile.major.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultButton 
                            title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> : 'Update'}
                            onPress={() => {handleUpdateProfile()}} />       
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <DateTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                onSelectDate={() => {setProfile({...profile, dateOfBirth: Moment(selectedDate).format("MM/DD/YYYY")}) 
                                     setCalendarVisible(!calendarVisible)}}
                modalVisible={calendarVisible} 
                showTimePicker={false}
                onChangeDate={(dateOfBirth) => setSelectedDate(dateOfBirth)}
            />
          </Modal>

      </SafeAreaView>
        
    )
}

export default EditProfile;