import React, { useState,useContext, useEffect } from 'react';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useDispatch } from 'react-redux';
import { scanSyllabi } from '../../actions/ocr';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

const method = (props) => {
    const isFocused = useIsFocused();
    const { state } = useContext(AuthContext);
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const startLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("SetUpScreen", {isAddModalVisible: false})
        }, 3000);
    };

    const scanOcrSyllabi = async () => {
        setIsLoading(true);
        let userId = state.userId
        let token = state.token
        console.log(props.route.params.base64StringAssignment.length + " aninu")
        if(props.route.params.base64StringSyllabi.length > 0) {
            console.log("SCANNING SYLLABI")
            await dispatch(scanSyllabi(userId, 1, 1, token, props.route.params.base64StringSyllabi));        
        }
        if(props.route.params.base64StringAssignment.length > 0) {
            console.log("SCANNING ASSIGNMENTS")
            await dispatch(scanSyllabi(userId, 2, 1, token, props.route.params.base64StringAssignment)); //for assignment
        }
        setTimeout(function(){
            setIsLoading(false);
            if(props.route.params.nextScreen === 'SetUp'){
                navigation.navigate('SetUpScreen', {isAddModalVisible: true})
            }else{
                navigation.navigate('ConfidenceScoreScreen')
            }
        }, 3000)
    }

    useEffect(() => {
        if(props.route.params.previousScreen === 'Syllabus'){
            scanOcrSyllabi()
        }else{
            startLoading()
        }
    }, [props]);


    return {
        isLoading
    };
  };
  
  export default method;