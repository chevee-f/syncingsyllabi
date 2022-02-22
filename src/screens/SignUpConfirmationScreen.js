import React, {useEffect} from 'react';
import { Image, 
         Text, 
         View, 
         StyleSheet, 
         Dimensions, 
         Platform,
       } from 'react-native';
import color from './../styles/colors'
import label from './../styles/label'
import { ActivityIndicator } from 'react-native-paper';


var {height, width} = Dimensions.get('window');

const SignUpConfirmationScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const startLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("SetUpScreen")
        }, 3000);
    };

    useEffect(() => {
        startLoading()
    });

    return (
      <View style={{ flex:1,backgroundColor:color.primary }}>
            <View style={styles.topLineContainer}>
                <Image 
                    source={require('../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={{alignItems:'center',marginTop:height * -0.12}}>
                <Image 
                    source={require('../assets/SalyFull.png')}
                    resizeMode='contain'
                />
                <Text style={[label.boldLargeHeading,{color:color.textDefault,marginVertical:15}]}>Yee-ha!</Text>
                <Text style={[label.smallHeading,styles.successMessage]}>
                    <Text>You have successfully created your account. </Text>
                    <Text>Let us get everything ready for you</Text>
                </Text>
            </View>
            <View style={styles.bottomLineContainer}>
                <Image 
                    source={require('../assets/carousel/BottomLines.png')}
                    resizeMode='contain'
                    style={styles.bottomLineImage}
                />
            </View>
            <View style={styles.spinnerContainer}>
                {isLoading &&
                    <ActivityIndicator size="small" color={color.textDefault} />
                }
            </View>

      </View>
    )
}

const styles = StyleSheet.create({
    topLineContainer:{
        alignSelf:'flex-end',
        marginTop:height * -0.27,
        width:'60%'
    },
    topLineImage:{
        height:height * 0.6,
        width:width * 0.92
    },
    bottomLineContainer:{
        alignSelf:'flex-start',
        marginTop:height * 0.21,
        marginLeft:width * -0.32
    },
    bottomLineImage:{
        height:height * 0.35,
        width:width * 0.75
    },
    successMessage:{
        color:color.textDefault,
        textAlign:'center',
        width: Platform.OS === 'ios' ? width * 0.75 : width * 0.7,
        lineHeight: 22
    },

    spinnerContainer: {
        width:'100%',
        justifyContent: "center",
        alignItems:'center',
        position:'absolute',
        marginTop: Platform.OS === 'ios' ? height * 0.63 : height * 0.75
      },
})

export default SignUpConfirmationScreen;