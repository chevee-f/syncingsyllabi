import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import { ActivityIndicator } from 'react-native-paper';
import method from './method';
import styles from './styles';
import color from './../../styles/colors'
import label from './../../styles/label'

const CodeVerificationScreen = ({ navigation }) => {

    const {
        emailAddress,
        isLoading,
        setEmailAddress,
        handleSearchAccount
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
                <Text style={[label.boldExtraLargeHeading, {color:color.textDefault}]}>Find your Account</Text>
                <Text style={[label.smallHeading, styles.text]}>
                    Please enter your email address to search for your account
                </Text>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.button}>
                    <DefaultInput 
                        label="Email Address"
                        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                        hasValue={emailAddress.length}
                    /> 
                </View>
                <View style={styles.button}>
                    <DefaultButton 
                        title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> : 'Search'}
                        onPress={() => {handleSearchAccount()}}
                    />
                </View>
            </View>
            
        </View>
    )

};

export default CodeVerificationScreen;