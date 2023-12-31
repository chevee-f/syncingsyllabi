import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import PasswordInput from '../../components/PasswordInput';
import DefaultButton from '../../components/DefaultButton';
import { ActivityIndicator } from 'react-native-paper';
import method from './method';
import styles from './styles';
import color from './../../styles/colors'
import label from './../../styles/label'
import SuccessModal from '../../components/SuccessModal'
import {Context as AuthContext} from '../../components/Context/AuthContext';

const ChangePasswordScreen = ({ navigation }) => {

    const {
        currentPassword,
        newPassword,
        confirmNewPassword,
        secureCurrentPassword,
        secureNewPassword,
        secureConfirmNewPassword,
        isLoading,
        modalVisible,
        inputValidation,
        setCurrentPassword,
        setNewPassword,
        setConfirmNewPassword,
        updateSecureCurrentPassword,
        updateSecureNewPassword,
        updateSecureConfirmNewPassword,
        handleChangePassword,
        handleValidPassword,
        closeModal
    } = method(navigation);

    const { state } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={styles.headerImageContainer}>
                <Image 
                    source={require('../../assets/Saly3.png')}
                    resizeMode='contain'
                    style={styles.headerImage}
                />
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../../assets/carousel/BottomLines.png')}
                    resizeMode='contain'
                    style={styles.bottomLineImage}
                />
            </View>
            <View style={[styles.mainContainer,{backgroundColor: state.isDarkTheme === 'true' ? color.darkTheme : '#fff'}]}>
                <ScrollView>
                    <View>
                        <TouchableOpacity onPress={closeModal}>
                            <Image 
                                source={require('../../assets/icons/closeButton.png')}
                                resizeMode='contain'
                                style={styles.close}
                            />
                        </TouchableOpacity>
                        <Text style={[label.boldLargeHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>Change Password</Text>
                        <View style={{marginVertical: 20}}>
                            <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>
                                In order to protect your account, make sure your password:
                            </Text>
                            <View style={{flexDirection: 'row',paddingLeft:15}}>
                                <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>{'\u2022'}</Text>
                                <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>must be at least 8 characters long</Text>
                            </View>
                            <View style={{flexDirection: 'row',paddingLeft:15}}>
                                <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>{'\u2022'}</Text>
                                <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>does not contain any common information of your profile. e.g. username123</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginBottom: !inputValidation.isValidCurrentPassword ? 0 : Platform.OS === 'ios' ? 20 : 10}}>
                        <PasswordInput 
                            label="Current Password"
                            onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                            secureTextEntry={secureCurrentPassword ? true : false}
                            updateSecureTextEntry={updateSecureCurrentPassword}
                            hasValue={currentPassword.length}
                            hasError={!inputValidation.isValidCurrentPassword}
                            errorMsg={inputValidation.currentPasswordErrMsg}
                            onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text, 'currentPassword')}
                        /> 
                    </View>
                    <View style={{marginBottom: !inputValidation.isValidNewPassword ? 0 : Platform.OS === 'ios' ? 20 : 10}}>
                        <PasswordInput 
                            label="New Password"
                            onChangeText={(newPassword) => setNewPassword(newPassword)}
                            secureTextEntry={secureNewPassword ? true : false}
                            updateSecureTextEntry={updateSecureNewPassword}
                            hasValue={newPassword.length}
                            hasError={!inputValidation.isValidNewPassword}
                            errorMsg={inputValidation.newPasswordErrMsg}
                            onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text, 'newPassword')}
                        /> 
                    </View>
                    <View style={{marginBottom: !inputValidation.isValidConfirmNewPassword ? 0 : 20}}>
                        <PasswordInput 
                            label="Confirm New Password"
                            onChangeText={(confirmNewPassword) => setConfirmNewPassword(confirmNewPassword)}
                            secureTextEntry={secureConfirmNewPassword ? true : false}
                            updateSecureTextEntry={updateSecureConfirmNewPassword}
                            hasValue={confirmNewPassword.length}
                            hasError={!inputValidation.isValidConfirmNewPassword}
                            errorMsg={inputValidation.confirmNewPasswordErrMsg}
                            onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text, 'confirmNewPassword')}
                        /> 
                        <Text style={[label.smallHeading, {color: state.isDarkTheme === 'true' ? color.default : color.primary}]}>This field must match your New Password</Text>
                    </View>
                    <View style={styles.button}>
                        <DefaultButton 
                            title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> : 'Update'}
                            onPress={() => {handleChangePassword()}}
                        />
                    </View>
                </ScrollView>
            </View>
            
            <SuccessModal 
                isRemove={false}
                successModalVisible={modalVisible} 
                successMessage='Your password has been changed successfully. Use your new password to login'
                headerText='Password Updated!'
                onClose={closeModal}
            />

        </KeyboardAvoidingView>
    )

};

export default ChangePasswordScreen;