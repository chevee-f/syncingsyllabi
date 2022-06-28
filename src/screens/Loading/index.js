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
import method from './method';

var {height, width} = Dimensions.get('window');

const LoadingScreen = (props) => {
    const {
        isLoading
    } = method(props);


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
                    source={props.route.params.previousScreen === 'Syllabus' ? require('../../assets/Saly38.png') : require('../../assets/SalyFull.png')}
                    resizeMode='contain'
                />
                <Text style={[label.boldLargeHeading,{color:color.textDefault,marginVertical:15}]}>
                    {props.route.params.previousScreen === 'Syllabus' ? 'Syncing Score' : 'Yee-ha!'}
                </Text>
                {props.route.params.previousScreen === 'Syllabus' ?
                    <Text style={[label.smallHeading,styles.successMessage]}>
                        <Text>The accuracy of what our AI scanned. If it's</Text>
                        <Text>not 100%, we check with you to verify.</Text>
                    </Text> :
                    <Text style={[label.smallHeading,styles.successMessage]}>
                        <Text>You have successfully created your account. </Text>
                        <Text>Let us get everything ready for you</Text>
                    </Text>
                }
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

export default LoadingScreen;