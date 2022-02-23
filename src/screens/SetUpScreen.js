import React from 'react';
import { StyleSheet,
         Text, 
         View, 
         Image,
         ScrollView,
         Dimensions, 
         Platform } from 'react-native';
import DefaultInput from './../components/DefaultInput';
import GradientItem from '../components/GradientItem'
import Item from '../components/Item'
import AddItem from '../components/AddItem'
import color from './../styles/colors'
import label from './../styles/label'
import DefaultButton from '../components/DefaultButton';

var {height, width} = Dimensions.get('window');

const SetUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        name: '',
        school: ''
    });

    const [classSyllabi, setClassSyllabi] = React.useState([
        {
            code: "MKTG 100S",
            name: "Brian Goerlich",
            schedule: "M 6pm-9pm"
        },
        {
            code: "MKTG 100S",
            name: "Brian Goerlich",
            schedule: "M 6pm-9pm"
        },
        {
            code: "MKTG 100S",
            name: "Brian Goerlich",
            schedule: "M 6pm-9pm"
        }
    ]);

    const [semesterGoals, setSemesterGoals] = React.useState([
        {
            code: "SHORT-TERM",
            goal: "Get a 4.0 GPA this semester",
        },
        {
            code: "MED-TERM",
            goal: "Get a 4.0 GPA this semester",
        },
        {
            code: "LONG-TERM",
            goal: "Get a 4.0 GPA this semester",
        }
    ]);

    return (
      <View style={{ flex:1}}>
        <View style={styles.headerContainer}>
                <View style={{marginTop: Platform.OS === 'ios' ? height * 0.08 : height * 0.05}}>
                    <Text style={[label.boldExtraLargeHeading,{color:color.textDefault}]}>Let's get started!</Text>
                    <Text style={[label.smallHeading,styles.headerActionText]}>
                        Together, we can make this work!
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../assets/Saly1.png')}
                        style={styles.image}
                    />
                </View>
        </View>
        <ScrollView>
            <View style={{marginHorizontal:22}}>
                <View style={{marginTop:height * 0.05}}>
                    <Text style={[label.boldSmallHeading2,{color:color.primary}]}>What's your name?</Text>
                    <DefaultInput 
                        label="Name"
                        hasValue={data.name.length}
                    /> 
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Text style={[label.boldSmallHeading2,{color:color.primary}]}>What school are you attending?</Text>
                    <DefaultInput 
                        label="School"
                        hasValue={data.school.length}
                    /> 
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Text style={[label.boldSmallHeading2,{color:color.primary}]}>Add your class syllabi</Text>
                    <View style={{flexDirection:'row'}}>
                        <AddItem />
                        {
                        classSyllabi.map((item) => {
                                return (
                                    <GradientItem 
                                        code={item.code}
                                        name={item.name}
                                        schedule={item.schedule}
                                    />
                                );
                            })                
                        }
                    </View>
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Text style={[label.boldSmallHeading2,{color:color.primary}]}>What are your semester goals?</Text>
                    <View style={{flexDirection:'row'}}>
                        <AddItem />
                        {
                        semesterGoals.map((item) => {
                                return (
                                    <Item 
                                        code={item.code}
                                        goal={item.goal}
                                    />
                                );
                            })                
                        }
                    </View>
                </View>
                <View style={{marginVertical: height * 0.05}}>
                    <DefaultButton 
                        title={`Let's get started!`}
                        onPress={() => {navigation.navigate('MainTabScreen')}}
                    />
                </View>
            </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor: color.primary,
        height: Platform.OS === 'ios' ? height * 0.25 : height * 0.3,
        width:'100%',
        borderRadius:16,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:20
    },
    image: {
        width: width * 0.48,
        height: height * 0.3,
        position:'absolute'
    },
    imageContainer:{
        marginTop: Platform.OS === 'ios' ? height * -0.14 : height * -0.09,
        marginLeft: Platform.OS === 'ios' ? width * -0.12 : width * -0.05
    },
    headerActionText:{
        color:color.textDefault,
        lineHeight:24,
        width:'70%'
    }
})
export default SetUpScreen;