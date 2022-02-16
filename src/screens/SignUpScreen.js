import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar 
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import color from '../styles/colors'; 
import label from '../styles/label';
import DefaultInput from '../components/DefaultInput';
import DefaultButton from '../components/DefaultButton';

const SignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        hasValue: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                hasValue: true
            });
        } else {
            setData({
                ...data,
                username: val,
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

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={color.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}></Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
                <Text style={[label.boldMediumHeading, {color:color.primary,marginBottom:10}]}>Sign Up</Text>  
                <DefaultInput 
                    label="Email Address"
                    onChangeText={(val) => textInputChange(val)}
                    hasValue={data.username.length}
                /> 
                <View style={[styles.inputContainer, {borderColor: data.password.length ? color.primary : color.default}]}>
                    <View style={{flexDirection:'row'}}>
                        <TextInput 
                            label="Password"
                            onChangeText={(val) => handlePasswordChange(val)}
                            secureTextEntry={data.secureTextEntry ? true : false}
                            autoCapitalize="none"
                            style={styles.input}
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
                        title="Sign Up"
                    />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center',marginTop:40}}>
                    <View style={{flex: 1, height: 0.5, backgroundColor: color.default}} />
                    <View>
                        <Text style={[styles.textOtherOption, label.smallHeading]}>
                            Or sign up using
                        </Text>
                    </View>
                    <View style={{flex: 1, height: 0.5, backgroundColor: color.default}} />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Image 
                        source={require('./../assets/icons/google.png')}
                        resizeMode='contain'
                        style={{
                        width:25,
                        height:25,
                        marginVertical:20,
                        marginHorizontal:10 
                        }}
                    />
                    <Image 
                        source={require('./../assets/icons/facebook.png')}
                        resizeMode='contain'
                        style={{
                        width:25,
                        height:25,
                        marginVertical:20,
                        marginHorizontal:15  
                        }}
                    />
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
        height: 55,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft:5,
        fontFamily: "Manrope",
        fontSize: 16,
        width:'85%'
    },
    inputContainer: {
        borderRadius: 4,
        height: 53 ,
        overflow: 'hidden',
        borderWidth:1,
        borderRadius:16,
        marginVertical:10
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
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1.4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth:5,
        borderColor:'#000',
        //borderBottomWidth: 1,
        //borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });