import React, {useEffect} from 'react';
import { Image, 
         Text, 
         View, 
         Dimensions
       } from 'react-native';
import color from '../../styles/colors'
import label from '../../styles/label'
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles'

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
                    source={require('../../assets/carousel/TopLines.png')}
                    resizeMode='contain'
                    style={styles.topLineImage}
                />
            </View>
            <View style={{alignItems:'center',marginTop:height * -0.12}}>
                <Image 
                    source={require('../../assets/SalyFull.png')}
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
                    source={require('../../assets/carousel/BottomLines.png')}
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

export default SignUpConfirmationScreen;