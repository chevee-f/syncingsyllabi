import React, { useState,useContext } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Dimensions,
    ScrollView,
    Platform 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import color from '../../styles/colors'; 
import label from '../../styles/label';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import CarouselCards from '../../components/Carousel/CarouselCards';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import styles from './styles'

var {height, width} = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {

    const {state, signIn} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const [isFocused, setIsFocused] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(true);
   
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

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
                /> 
                <View style={[styles.inputContainer, {borderColor: password.length ? color.primary : color.default}]}>
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
                            activeUnderlineColor={color.primary}
                            theme={{ colors: { text: color.primary, placeholder: password.length ? color.primary : color.default } }}
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
            
                <View style={styles.button}>
                    <DefaultButton 
                        title={isSignUp ? 'Sign Up' : 'Sign In'}
                        onPress={() => {
                            !isSignUp ? signIn({email, password}) : navigation.navigate('SignUpConfirmationScreen') ;
                        }}
                    />
                </View>
                {!isSignUp &&
                    <TouchableOpacity style={{padding:10,marginBottom:Platform.OS === 'ios' ? height * -0.02 : height * -0.06}}>
                        <Text style={[label.boldExtraSmallHeading,{color:color.default}]}>Forgot Password</Text>
                    </TouchableOpacity>   
                }
                <View style={styles.otherOptionContainer}>
                    <View style={styles.horizontalLine} />
                    <View>
                        <Text style={[styles.textOtherOption, label.smallHeading]}>
                            Or {isSignUp ? 'sign up' : 'sign in'} using
                        </Text>
                    </View>
                    <View style={styles.horizontalLine} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Image 
                        source={require('../../assets/icons/google.png')}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Image 
                        source={require('../../assets/icons/facebook.png')}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                </View> 
                <View style={styles.signInContainer}>
                    <Text style={[label.smallHeading2,{color:color.default}]}>{!isSignUp ? `Don't have an account? ` : 'Already have an account? '}</Text>
                    <TouchableOpacity onPress={() => {
                                setIsSignUp(!isSignUp)
                                }}>
                        <Text style={[label.boldSmallHeading,{color:color.primary}]}>
                            {!isSignUp ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;
