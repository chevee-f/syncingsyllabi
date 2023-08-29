import React, { useState, useRef } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Dimensions,
    ScrollView,
    Platform ,
    KeyboardAvoidingView,
    Animated,
    Easing
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
// import { AppleButton } from '@invertase/react-native-apple-authentication';

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
        signUpVisible,
        setSignUpVisible,
        updateSecureTextEntry,
        handleSignInSignUp,
        handleValidEmail,
        handleValidPassword,
        handleGoogleSignIn,
        setIsSignUp,
        setIsFocused,
        setPassword,
        setEmail,
        handleFacebookSignIn,
        handleSignInAsGuest,
        onAppleButtonPress,
    } = method(navigation);

    const signUpBackgroundAnim = useRef(new Animated.Value(1.35)).current;
    const imgMarginBottomAnim = useRef(new Animated.Value(0)).current;
    const signUpModalHeightAnim = useRef(new Animated.Value(0)).current;
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)
    const [isSignUpOpened, setIsSignUpOpened] = useState(false);

    const startAnim = (anim, value, duration=300) => {
        Animated.timing(anim, {
            toValue: value,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: false
        }).start();
    }

    const clearAnims = () => {
        startAnim(signUpBackgroundAnim, 1.35, 0);
        startAnim(imgMarginBottomAnim, 10, 0);
        startAnim(signUpModalHeightAnim, 0, 0);
        setIsSignUpOpened(false);
    }

    const startSignUpAnimation = () => {
        startAnim(signUpBackgroundAnim, 0.5);
        startAnim(imgMarginBottomAnim, -120);
        startAnim(signUpModalHeightAnim, 580);
        setIsSignUpOpened(true);
    }

    const handleConfirmPassword = () => {
        console.log(confirmPassword + "==" + password)
        if(confirmPassword == password) {
            setIsValidConfirmPassword(true);
        } else {
            setIsValidConfirmPassword(false);
        }
    }

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
        { !isSignUp && 
            <View style={styles.carouselContainer}>
                <CarouselCards />
            </View>
        }
        {/* <Animatable.View animation="fadeInUpBig" style={styles.mainContainer}> */}
            { isSignUp ?
            <View style={{flex: 1}}>
                <Animated.View style={{ flex: signUpBackgroundAnim, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}>
                    <Animated.Image 
                        source={require('../../assets/SalyFull.png')}
                        resizeMode='contain'
                        style={{ marginBottom: imgMarginBottomAnim, width: '80%', height: 290}}
                    />
                    <Text style={{ color: '#fff', fontSize: 30}}>Welcome!</Text>
                    <Text style={{ color: '#fff', fontSize: 14, lineHeight: 28}}>Create your account</Text>
                </Animated.View>

                
            <Animated.View style={[{position: 'absolute', bottom: -40, width: '100%', paddingHorizontal: 20, paddingTop: 40, borderRadius: 16, height: signUpModalHeightAnim, elevation: 1, zIndex: 1, backgroundColor: '#fff'}]}>
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
                {/* <View> */}
                <View style={[styles.inputContainer, styles.signUpInputContainer, {borderColor: !inputValidation.isValidPassword ? color.error : password.length ? color.primary: color.default, backgroundColor: '#fff'}]}>
                        <View style={{flexDirection:'row'}}>
                            <TextInput 
                                label="Password"
                                onFocus={() => { setIsFocused(true)}}
                                onBlur={() => { setIsFocused(false)}}
                                onChangeText={(password) => setPassword(password)}
                                secureTextEntry={secureTextEntry ? true : false}
                                autoCapitalize="none"
                                style={[styles.input,styles.signUpInput,{marginTop: isFocused || password.length ? -5 : -2}]}
                                selectionColor={color.primary}
                                activeUnderlineColor={!inputValidation.isValidPassword ? color.error : color.primary}
                                theme={{ colors: { text: !inputValidation.isValidPassword ? color.error : color.primary, placeholder: !inputValidation.isValidPassword ? color.error : password.length ? color.primary : color.default } }}
                                onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text)}
                            /> 
                            {/* <TouchableOpacity
                                onPress={updateSecureTextEntry}
                                style={{justifyContent:'center'}}
                            >
                                {secureTextEntry ? 
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>SHOW</Text>
                                :
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>HIDE</Text>
                                }
                            </TouchableOpacity> */}
                        
                        </View>
                    </View> 
                    {!inputValidation.isValidPassword &&
                        <Animatable.View animation="fadeInLeft" duration={500} style={{paddingLeft:15,marginBottom:12}}>
                            <Text style={styles.errorMsg}>{inputValidation.passErrMsg}</Text>
                        </Animatable.View>
                    }
                    <View style={[styles.inputContainer, styles.signUpInputContainer, {borderColor: !isValidConfirmPassword ? color.error : password.length ? color.primary: color.default, backgroundColor: '#fff'}]}>
                        <View style={{flexDirection:'row'}}>
                            <TextInput 
                                label="Confirm Password"
                                onFocus={() => { setIsFocused(true)}}
                                onBlur={() => { setIsFocused(false)}}
                                onChangeText={(password) => {
                                    setConfirmPassword(password)
                                }}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                style={[styles.input,styles.signUpInput,{marginTop: isFocused || password.length ? -5 : -2}]}
                                selectionColor={color.primary}
                                activeUnderlineColor={!isValidConfirmPassword ? color.error : color.primary}
                                theme={{ colors: { text: !isValidConfirmPassword ? color.error : color.primary, placeholder: !isValidConfirmPassword ? color.error : password.length ? color.primary : color.default } }}
                                blurOnSubmit={false}
                                onEndEditing={(e)=>{
                                    handleConfirmPassword()
                                    // handleValidPassword(e.nativeEvent.text);
                                }}
                            /> 
                            {/* <TouchableOpacity
                                onPress={updateSecureTextEntry}
                                style={{justifyContent:'center'}}
                            >
                                {secureTextEntry ? 
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>SHOW</Text>
                                :
                                <Text style={[label.extraSmallHeading, {color: password.length ? color.primary : color.default}]}>HIDE</Text>
                                }
                            </TouchableOpacity> */}
                        
                        </View>
                    </View> 
                    {!isValidConfirmPassword &&
                        <Animatable.View animation="fadeInLeft" duration={500} style={{paddingLeft:15,marginBottom:12}}>
                            <Text style={styles.errorMsg}>Passwords did not match</Text>
                        </Animatable.View>
                    }
                    <View style={styles.button}>
                        <DefaultButton 
                            title={'Sign up'}
                            onPress={() => {handleSignInSignUp()}}
                        />
                    </View>
                    {/* Email Sign Up form */}
                    {isSignUpOpened &&
                    <View style={[{position: 'absolute', bottom: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}]}>
                        <Text style={[label.smallHeading2,{color:color.default}]}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => {
                            setIsSignUp(!isSignUp)
                            clearAnims();
                        }}>
                            <Text style={[label.boldSmallHeading,{color: !isSignUpOpened ? "#fff": color.primary}]}>
                                {!isSignUp ? 'Sign Up' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    }
                {/* </View> */}
            </Animated.View>
                
                <View style={{ flex: 1}}>
                    <View style={styles.mainContainer}>
                        <View style={styles.button}>
                            <DefaultButton 
                                title={'E-mail'}
                                onPress={()=> {
                                    // setSignUpVisible(!signUpVisible)
                                    startSignUpAnimation();                                    
                                }}
                            />
                        </View>
                        <View style={styles.button}>
                            <DefaultButton 
                                title={'Sign-Up using Gmail'}
                                image={'google'}
                                onPress={handleGoogleSignIn}
                            />
                        </View>
                        <View style={styles.button}>
                            <DefaultButton 
                                title={'Sign-Up using Facebook'}
                                image={'facebook'}
                                onPress={handleFacebookSignIn}
                            />
                        </View>
                        <View style={[styles.signInContainer, {marginTop: !inputValidation.isValidEmail || !inputValidation.isValidPassword ? height * 0.01 : Platform.OS === 'ios' ? height * 0.045 : height * 0.080}]}>
                            <Text style={[label.smallHeading2,{color:color.default}]}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => {
                                setIsSignUp(!isSignUp);
                                clearAnims();
                            }}>
                                <Text style={[label.boldSmallHeading,{color: '#fff'}]}>
                                    {!isSignUp ? 'Sign Up' : 'Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>
            :

                <View style={styles.mainContainer}>
            {/* <ScrollView> */}
                {/* <Text style={[label.boldSmallHeading2, {color:color.primary,marginBottom:height * 0.01}]}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}   
                </Text>   */}
                <DefaultInput 
                    label="Email Address"
                    onChangeText={(email) => setEmail(email)}
                    hasValue={email.length}
                    hasError={!inputValidation.isValidEmail}
                    errorMsg={inputValidation.emailErrMsg}
                    onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                /> 
                <View>
                    <View style={[styles.inputContainer, {borderColor: !inputValidation.isValidPassword ? color.error : password.length ? color.primary : color.default, backgroundColor: '#fff'}]}>
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
                <View style={{ }}>
                    <View style={styles.button}>
                        <DefaultButton 
                            title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> :
                                    isSignUp ? 'Sign Up' : 'Sign In'}
                            onPress={() => {handleSignInSignUp()}
                        }
                        />
                    </View>
                    <View style={styles.button}>
                        <DefaultButton 
                            title={'Sign In as Guest'}
                            onPress={() => {handleSignInAsGuest()}}
                        />
                    </View>
                </View>
                {/* <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 160, // You must specify a width
                        height: 45, // You must specify a height
                    }}
                    onPress={() => onAppleButtonPress()}
                /> */}
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
                <View style={[styles.signInContainer, {marginTop: !inputValidation.isValidEmail || !inputValidation.isValidPassword ? height * 0.01 : Platform.OS === 'ios' ? height * 0.01 : height * 0.018}]}>
                    <Text style={[label.smallHeading2,{color:color.default}]}>{!isSignUp ? `Don't have an account? ` : 'Already have an account? '}</Text>
                    <TouchableOpacity onPress={() => {setIsSignUp(!isSignUp)}}>
                        <Text style={[label.boldSmallHeading,{color: '#fff'}]}>
                            {!isSignUp ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            {/* </ScrollView> */}
            </View>
            
             }
        {/* </Animatable.View> */}
      </KeyboardAvoidingView>
    );
};

export default SignUpScreen;
