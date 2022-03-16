import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import method from './method';
import styles from './styles';
import color from './../../styles/colors'
import label from './../../styles/label'

const CodeVerificationScreen = ({ navigation }) => {

    const {
        verificationCode,
        setVerificationCode,
        handleCodeVerification
    } = method(navigation);


    return (
        <View style={styles.container}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../../assets/carousel/BottomLines.png')}
                    resizeMode='contain'
                    style={styles.bottomLineImage}
                />
            </View>
            <View style={styles.headerContainer}>
                <Text style={[label.boldExtraLargeHeading, {color:color.textDefault}]}>Verify Account</Text>
                <Text style={[label.smallHeading, styles.text]}>
                    Please enter the verification code we sent to your email address
                </Text>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.button}>
                    <DefaultInput 
                        label="Verification Code"
                        onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
                        hasValue={verificationCode.length}
                    /> 
                </View>
                <View style={styles.button}>
                    <DefaultButton 
                        title='Verify'
                        //onPress={() => {handleCodeVerification()}}
                        onPress={() => {navigation.navigate('SignUpConfirmationScreen')}}
                    />
                </View>
                
                <View style={styles.bottomContainer}>
                    <Text style={[label.smallHeading2,{color:color.default}]}>Didn't get the code? </Text>
                    <TouchableOpacity>
                        <Text style={[label.boldSmallHeading,{color:color.primary}]}>
                            Resend Code
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )

};

export default CodeVerificationScreen;