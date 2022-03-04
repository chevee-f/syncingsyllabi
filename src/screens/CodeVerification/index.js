import React from 'react';
import { View } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import method from './method';

const CodeVerificationScreen = ({ navigation }) => {

    const {
        verificationCode,
        setVerificationCode,
        handleCodeVerification
    } = method(navigation);


    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <DefaultInput 
                label="Verification Code"
                onChangeText={(verificationCode) => setVerificationCode(verificationCode)}
                hasValue={verificationCode.length}
            /> 

            <DefaultButton 
                title='Submit'
                onPress={() => {handleCodeVerification()}}
            />
        </View>
    )

};

export default CodeVerificationScreen;