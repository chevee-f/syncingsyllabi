import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    Platform 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import color from '../styles/colors'; 
import label from '../styles/label';
import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';
import CarouselCards from '../components/Carousel/CarouselCards';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../actions/auth';

var {height, width} = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {

    const {auth} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const signInUser = data => {
        dispatch(signIn(data))
        navigation.navigate('MainTabScreen')
    }

    const [isFocused, setIsFocused] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(true);
    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        hasValue: false,
        secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                hasValue: true
            });
        } else {
            setData({
                ...data,
                email: val,
                hasValue: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (username, password) => {
        //signIn(username, password);
    }

    return (
      <View style={styles.container}>
        <View style={styles.topLineContainer}>
            <Image 
                source={require('../assets/carousel/TopLines.png')}
                resizeMode='contain'
                style={styles.topLineImage}
            />
        </View>
        <View style={styles.bottomLineContainer}>
            <Image 
                source={require('../assets/carousel/BottomLines.png')}
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
                    onChangeText={(val) => textInputChange(val)}
                    hasValue={data.email.length}
                /> 
                <View style={[styles.inputContainer, {borderColor: data.password.length ? color.primary : color.default}]}>
                    <View style={{flexDirection:'row'}}>
                        <TextInput 
                            label="Password"
                            onFocus={() => { setIsFocused(true)}}
                            onBlur={() => { setIsFocused(false)}}
                            onChangeText={(val) => handlePasswordChange(val)}
                            secureTextEntry={data.secureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={[styles.input,{marginTop: isFocused || data.password.length ? -5 : -2}]}
                            selectionColor={color.primary}
                            activeUnderlineColor={color.primary}
                            theme={{ colors: { text: color.primary, placeholder: data.password.length ? color.primary : color.default } }}
                        /> 
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                            style={{justifyContent:'center'}}
                        >
                            {data.secureTextEntry ? 
                            <Text style={[label.extraSmallHeading, {color: data.password.length ? color.primary : color.default}]}>SHOW</Text>
                            :
                            <Text style={[label.extraSmallHeading, {color: data.password.length ? color.primary : color.default}]}>HIDE</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    
                </View>         
            
                <View style={styles.button}>
                    <DefaultButton 
                        title={isSignUp ? 'Sign Up' : 'Sign In'}
                        //onPress={() => {isSignUp ? navigation.navigate("SignUpConfirmationScreen") : navigation.navigate("MainTabScreen")}}
                        //onPress={() => loginHandle(data.username, data.password)}
                        onPress={() => signInUser(data)}
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
                        source={require('./../assets/icons/google.png')}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                    <Image 
                        source={require('./../assets/icons/facebook.png')}
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

const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: height * 0.063,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: height * 0.016,
        width:'85%',
        justifyContent:'center'
    },
    inputContainer: {
        borderRadius: 4,
        height: height * 0.055,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:8
    },
    textOtherOption: {
        textAlign: 'center',
        flexDirection:'row',
        color:color.default
    },
    container: {
        flex: 1, 
        backgroundColor: color.primary
    },
    mainContainer: {
        flex: 1.27,
        backgroundColor: '#fff',
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        paddingHorizontal: 20,
        paddingVertical: height * 0.04
    },
    otherOptionContainer:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? height * 0.055 : height * 0.05
    },
    horizontalLine:{
        flex: 1, 
        height: 0.5, 
        backgroundColor: color.default
    },
    icon:{
        width:25,
        height:25,
        marginVertical:height * 0.016,
        marginHorizontal:13 
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signInContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop: Platform.OS === 'ios' ? height * 0.055 : height * 0.018
    },
    topLineContainer:{
        position:'absolute',
        alignSelf:'flex-end',
        marginTop:Platform.OS === 'ios' ? height * -0.27 : height * -0.32,
        width:'60%'
    },
    topLineImage:{
        height:height * 0.6,
        width:width * 0.92
    },
    bottomLineContainer:{
        position:'absolute',
        alignSelf:'flex-start',
        marginTop:height * 0.25,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height:height * 0.35,
        width:width * 0.75
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: height * 0.05
    },
  });