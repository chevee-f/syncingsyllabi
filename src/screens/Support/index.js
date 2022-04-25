import React from 'react';
import { View, 
         Image, 
         Text, 
         TouchableOpacity, 
         Platform, 
         KeyboardAvoidingView, 
         ScrollView } from 'react-native';
import DefaultButton from '../../components/DefaultButton';
import method from './method';
import styles from './styles';
import color from './../../styles/colors'
import label from './../../styles/label'
import DefaultInput from '../../components/DefaultInput';
import { TextInput } from 'react-native-paper';

const SupportScreen = ({ navigation }) => {

    const {
        closeModal
    } = method(navigation);

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
                    source={require('../../assets/SalySupport.png')}
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
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View>
                        <TouchableOpacity onPress={closeModal}>
                            <Image 
                                source={require('../../assets/icons/closeButton.png')}
                                resizeMode='contain'
                                style={styles.close}
                            />
                        </TouchableOpacity>
                        <Text style={[label.boldMediumHeading, {color:color.primary}]}>Support</Text>
                        <Text style={[label.smallHeading, {color:color.primary, marginVertical:20 }]}>
                            Lets talk business! Or message us with your concerns
                        </Text>
                    </View>
                    <View>
                        <DefaultInput label="Subject" /> 
                    </View>
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                mode="flat"
                                style={styles.input}
                                placeholder="Message"
                                selectionColor={color.primary}
                                activeUnderlineColor={color.primary}
                                //multiline={true}
                                //numberOfLines={5}
                                theme={{ colors: { text: color.primary, placeholder: color.default } }}
                            />
                        </View> 
                    </View>
                    <View style={styles.button}>
                        <DefaultButton title='Send'/>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[label.boldSmallHeading, {color:color.primary}]}>Address</Text>
                        <Text style={[label.smallHeading, {color:color.primary}]}>
                            Block 123 Apple Street California
                        </Text>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[label.boldSmallHeading, {color:color.primary}]}>Contact Number</Text>
                        <Text style={[label.smallHeading, {color:color.primary}]}>
                            +123 456 7890
                        </Text>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[label.boldSmallHeading, {color:color.primary}]}>Email Address</Text>
                        <Text style={[label.smallHeading, {color:color.primary}]}>
                            my@mail.com
                        </Text>
                    </View>
                </ScrollView>
            </View>
            


        </KeyboardAvoidingView>
    )

};

export default SupportScreen;