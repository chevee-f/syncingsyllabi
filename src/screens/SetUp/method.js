import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { updateUser } from '../../actions/user';
import { getSyllabusDetail } from '../../actions/syllabus';

const method = ({navigation}) => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if(error.length !== 0) setHasError(true)
       
    }, [error]);

    const [modalVisible, setModalVisible] = useState(false);
    const [goalVisible, setGoalVisible] = useState(false);
    const [syllabusId, setSyllabusId] = useState(null);

    const [profile, setProfile] = React.useState({
        firstName: '',
        lastName: '',
        school: '',
        email: null,
        dateOfBirth: null,
        major: null
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const handleLetsGetStarted = async() => {
        setIsLoading(true)
        let userId = state.userId
        let token = state.token
        await dispatch(updateUser(profile, userId, token))
        if(hasError){
            Alert.alert("Error", error,
                [{ text: "OK", onPress: () => setIsLoading(false)}],
                { cancelable: false }
            );
        }else{
            setIsLoading(false)
            navigation.navigate('MainTabScreen')
        }
    }

    const handleCallback = async(id) => {
       setSyllabusId(id)
       //let userId = state.userId
       //let token = state.token
       //await dispatch(getSyllabusDetail(id, userId, token))
       setModalVisible(true)
    }

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

    const [bgColor, setBgColor] = React.useState(
        [
            ['#FF9966', '#FF5E62'],
            ['#56CCF2', '#2F80ED'],
            ['#4776E6', '#8E54E9'],
            ['#00B09B', '#96C93D'],
            ['#A8C0FF', '#3F2B96'],
            ['#ED213A', '#93291E'],
            ['#FDC830', '#F37335'],
            ['#00B4DB', '#0083B0'],
            ['#AD5389', '#3C1053'],
            ['#EC008C', '#FC6767'],
            ['#DA4453', '#89216B'],
            ['#654EA3', '#EAAFC8']
        ]
      );

    return {
        profile,
        bgColor,
        isLoading,
        semesterGoals,
        modalVisible,
        goalVisible,
        syllabusId,
        setProfile,
        setGoalVisible,
        setModalVisible,
        handleLetsGetStarted,
        handleCallback,
        setSyllabusId
    };
  };
  
  export default method;