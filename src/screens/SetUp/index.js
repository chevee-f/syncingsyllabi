import React, { useEffect, useContext } from 'react';
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
import AddSyllabus from '../Syllabus/Add'
import AddGoal from '../Goal/Add'
import styles from './styles'
import Label from '../../components/Label'
import method from './method'
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { getSyllabusByUser } from '../../actions/syllabus';
import { getGoalByUser } from '../../actions/goal';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

var {height, width} = Dimensions.get('window');

const SetUpScreen = (props) => {
    const navigation = useNavigation();
    const {
        profile,
        bgColor,
        isLoading,
        modalVisible,
        goalVisible,
        syllabusId,
        typeOfGoal,
        goalId,
        setGoalId,
        setProfile,
        setGoalVisible,
        setModalVisible,
        handleLetsGetStarted,
        handleCallback,
        setSyllabusId,
        handleSelectGoal
    } = method({navigation});

    const { state } = useContext(AuthContext);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const { goals } = useSelector(state => state.goalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let userId = state.userId
        let token = state.token
        dispatch(getSyllabusByUser(userId, token));
        dispatch(getGoalByUser(userId, token));
        // console.log("Inside SetUp");
        // console.log(props.route.params);

        // setModalVisible(true)
    }, [syllabus.length, goals.length]);

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
                        <AddItem onPress={() => {setSyllabusId(null)
                                                 setModalVisible(true)}} />
                        <ScrollView horizontal>
                            {syllabus.length > 0 &&
                                syllabus.map((item) => {
                                    return (
                                        <GradientItem 
                                            parentCallback = {handleCallback}
                                            code={item.className}
                                            name={item.teacherName}
                                            schedule={!item.classSchedule ? '' : item.classSchedule.map(function(data){return data;}).join("|")}
                                            selectedBgColor={bgColor[parseInt(item.colorInHex)]}
                                            id={item.id}
                                        />
                                    );
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={{marginTop:height * 0.02}}>
                    <Label text="What are your semester goals?" />
                    <View style={{flexDirection:'row'}}>
                        <AddItem onPress={() => {setGoalId(null)
                                                 setGoalVisible(true)}} />
                        <ScrollView horizontal>
                            {goals.map((item) => {
                                    let data = typeOfGoal.filter((x) => x.value == item.goalType)
                                    return (
                                        <View>
                                            <Item 
                                                onClick = {handleSelectGoal}
                                                code={data[0].label}
                                                goal={item.goalDescription}
                                                id={item.id}
                                            />
                                        </View>
                                    );
                                })                
                            }   
                        </ScrollView>
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
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible}
                syllabusId={syllabusId}
                setSyllabusId={setSyllabusId}
            />

            <AddGoal 
                onClose={() => { setGoalVisible(!goalVisible); }}
                goalVisible={goalVisible} 
                setGoalVisible={setGoalVisible}
                goalId={goalId}
                setGoalId={setGoalId}
            />

        </ScrollView>
      </View>
    )
}

export default SetUpScreen;