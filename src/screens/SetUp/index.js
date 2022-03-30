import React, { useEffect } from 'react';
import { Text, 
         View, 
         Image,
         ScrollView,
         Dimensions, Alert,
         Platform } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import GradientItem from '../../components/GradientItem'
import Item from '../../components/Item'
import AddItem from '../../components/AddItem'
import color from '../../styles/colors'
import label from '../../styles/label'
import DefaultButton from '../../components/DefaultButton';
import AddSyllabus from '../Syllabus/Add'
import AddGoal from '../Goal/Add'
import styles from './styles'
import Label from '../../components/Label'
import method from './method'
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';

var {height, width} = Dimensions.get('window');

const SetUpScreen = ({navigation}) => {

    const {
        profile,
        bgColor,
        isLoading,
        semesterGoals,
        modalVisible,
        goalVisible,
        setProfile,
        setGoalVisible,
        setModalVisible,
        handleLetsGetStarted
    } = method({navigation});

    const { syllabus } = useSelector(state => state.syllabusReducer);
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

    useEffect(() => {

    }, [syllabus]);

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
                    <Label text="What's your name?" />
                    <DefaultInput 
                        label="Name"
                        value={profile.firstName}
                        onChangeText={(name) =>  setProfile({...profile, firstName: name})}
                        hasValue={profile.firstName.length}
                    /> 
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Label text="What school are you attending?" />
                    <DefaultInput 
                        label="School"
                        value={profile.school}
                        onChangeText={(school) =>  setProfile({...profile, school: school})}
                        hasValue={profile.school.length}
                    /> 
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Label text="Add your class syllabi" />
                    <View style={{flexDirection:'row'}}>
                        <AddItem onPress={() => setModalVisible(true)} />
                        {
                        //classSyllabi.map((item) => {
                              //  return (
                                    <GradientItem 
                                        //code={item.code}
                                        code={syllabus.className}
                                        name={syllabus.teacherName}
                                        schedule={Moment(syllabus.classSchedule).format("MM/DD/YYYY hh:mm A")}
                                        selectedBgColor={bgColor[syllabus.colorInHex]}
                                        />

                                   
                               // );
                        //    })                
                        }
                    </View>
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Label text="What are your semester goals?" />
                    <View style={{flexDirection:'row'}}>
                        <AddItem onPress={() => setGoalVisible(true)} />
                        {semesterGoals.map((item) => {
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
                        title={isLoading ? <ActivityIndicator size="small" color={color.textDefault} /> : `Let's get started!`}
                        onPress={() => {handleLetsGetStarted()}}
                    />
                </View>
            </View>

            <AddSyllabus 
                onClose={() => { setModalVisible(!modalVisible); }}
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
            />

            <AddGoal 
                onClose={() => { setGoalVisible(!goalVisible); }}
                goalVisible={goalVisible} 
                setGoalVisible={setGoalVisible}
            />

        </ScrollView>
      </View>
    )
}

export default SetUpScreen;