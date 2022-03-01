import React from 'react';
import { Text, 
         View, 
         Image,
         ScrollView,
         Dimensions, 
         Platform } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import GradientItem from '../../components/GradientItem'
import Item from '../../components/Item'
import AddItem from '../../components/AddItem'
import color from '../../styles/colors'
import label from '../../styles/label'
import DefaultButton from '../../components/DefaultButton';
import styles from './styles'

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
                        source={require('../../assets/Saly1.png')}
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

export default SetUpScreen;