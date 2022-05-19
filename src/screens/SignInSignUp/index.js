import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Dimensions,
    ScrollView,
    Platform ,
    KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import color from '../../styles/colors'; 
import label from '../../styles/label';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import CarouselCards from '../../components/Carousel/CarouselCards';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles'
import method from './method';

var {height, width} = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {

    const {
        email,
        password,
        secureTextEntry,
        isLoading,
        isFocused,
        isSignUp,
        inputValidation,
        updateSecureTextEntry,
        handleSignInSignUp,
        handleValidEmail,
        handleValidPassword,
        handleGoogleSignIn,
        setIsSignUp,
        setIsFocused,
        setPassword,
        setEmail,
        handleFacebookSignIn
    } = method(navigation);

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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
        <View style={styles.carouselContainer}>
            <CarouselCards />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.mainContainer}>
            <ScrollView>
                <Text style={[label.boldSmallHeading2, {color:color.primary,marginBottom:height * 0.01}]}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}   
                </Text>  
                <DefaultInput 
                    label="Email Address"
                    onChangeText={(email) => setEmail(email)}
                    hasValue={email.length}
                    hasError={!inputValidation.isValidEmail}
                    errorMsg={inputValidation.emailErrMsg}
                    onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                /> 
                <View>
                    <View style={[styles.inputContainer, {borderColor: !inputValidation.isValidPassword ? color.error : password.length ? color.primary : color.default}]}>
                        <View style={{flexDirection:'row'}}>
                            <TextInput 
                                label="Password"
                                onFocus={() => { setIsFocused(true)}}
                                onBlur={() => { setIsFocused(false)}}
                                onChangeText={(password) => setPassword(password)}
                                secureTextEntry={secureTextEntry ? true : false}
                                autoCapitalize="none"
                                style={[styles.input,{marginTop: isFocused || password.length ? -5 : -2}]}
                                selectionColor={color.primary}
                                activeUnderlineColor={!inputValidation.isValidPassword ? color.error : color.primary}
                                theme={{ colors: { text: !inputValidation.isValidPassword ? color.error : color.primary, placeholder: !inputValidation.isValidPassword ? color.error : password.length ? color.primary : color.default } }}
                                onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text)}
                            /> 
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                                style={{justifyContent:'center'}}
                            >
                                {secureTextEntry ? 
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>SHOW</Text>
                                :
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>HIDE</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View> 
                    {!inputValidation.isValidPassword &&
                        <Animatable.View animation="fadeInLeft" duration={500} style={{paddingLeft:15,marginBottom:12}}>
                            <Text style={styles.errorMsg}>{inputValidation.passErrMsg}</Text>
                        </Animatable.View>
                    }
                </View>
            
                <View style={styles.button}>
                    <DefaultButton 
                        title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> :
                               isSignUp ? 'Sign Up' : 'Sign In'}
                        onPress={() => {handleSignInSignUp()}
                    }
                    />
                </View>
                {!isSignUp &&
                    <TouchableOpacity style={styles.forgotPassword} onPress={() => {navigation.navigate('RecoverAccountScreen')}}>
                        <Text style={[label.boldExtraSmallHeading,{color:color.default}]}>Forgot Password</Text>
                    </TouchableOpacity>   
                }
                <View style={[styles.otherOptionContainer,{marginTop: !inputValidation.isValidEmail || !inputValidation.isValidPassword ? height * 0.04 : Platform.OS === 'ios' ? height * 0.055 : height * 0.05}]}>
                    <View style={styles.horizontalLine} />
                    <View>
                        <Text style={[styles.textOtherOption, label.smallHeading]}>
                            Or {isSignUp ? 'sign up' : 'sign in'} using
                        </Text>
                    </View>
                    <View style={styles.horizontalLine} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity onPress={handleGoogleSignIn}>
                        <Image 
                            source={require('../../assets/icons/google.png')}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFacebookSignIn}>
                        <Image 
                            source={require('../../assets/icons/facebook.png')}
                            resizeMode='contain'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View> 
                <View style={[styles.signInContainer, {marginTop: !inputValidation.isValidEmail || !inputValidation.isValidPassword ? height * 0.01 : Platform.OS === 'ios' ? height * 0.055 : height * 0.018}]}>
                    <Text style={[label.smallHeading2,{color:color.default}]}>{!isSignUp ? `Don't have an account? ` : 'Already have an account? '}</Text>
                    <TouchableOpacity onPress={() => {setIsSignUp(!isSignUp)}}>
                        <Text style={[label.boldSmallHeading,{color:color.primary}]}>
                            {!isSignUp ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
      </KeyboardAvoidingView>
    );
};

export default SignUpScreen;
