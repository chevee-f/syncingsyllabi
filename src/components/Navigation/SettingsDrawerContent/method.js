import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { getSyllabusByUser } from '../../../actions/syllabus';

const method = () => {

    const { state, setTheme } = useContext(AuthContext);
    const { goals } = useSelector(state => state.goalReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [aboutModalVisible, setAboutModalVisible] = useState(false);
    const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(false);
    const [termsConditionModalVisible, setTermsConditionModalVisible] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(null);
    const [changeTheme, setChangeTheme] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    
    const toggleTheme = () => {
        setIsDarkTheme(previousState => !previousState)
        //let isDarkTheme = !isDarkTheme
        //setTheme({isDarkTheme})
        setChangeTheme(true)

    } 

    const data = [
        {
            title: 'Classes',
            count: syllabus.length
        },{
            title: 'Goals',
            count: goals.length
        },
        //{
        //    title: 'Friends',
        //    count: '7'
        //},
    ];

    useEffect(() => {
        if(isDarkTheme === null) state.isDarkTheme === 'true' ? setIsDarkTheme(true) : setIsDarkTheme(false)
        let userId = state.userId
        let token = state.token
        dispatch(getSyllabusByUser(userId, token));

        if(changeTheme){
            setTheme({isDarkTheme})
            setChangeTheme(false)
        }

    }, [syllabus.length,goals.length,changeTheme,isDarkTheme]);
  
    return {
        data,
        aboutModalVisible,
        privacyPolicyModalVisible,
        termsConditionModalVisible,
        isDarkTheme,
        imageLoading,
        setImageLoading,
        toggleTheme,
        setTermsConditionModalVisible,
        setPrivacyPolicyModalVisible,
        setAboutModalVisible
    };
  };
  
  export default method;