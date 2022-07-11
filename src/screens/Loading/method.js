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
            navigation.navigate("SetUpScreen")
        }, 3000);
    };

    const scanOcrSyllabi = async () => {
        let userId = state.userId
        let token = state.token
        await dispatch(scanSyllabi(userId, 1, 1, token, props.route.params.base64StringSyllabi));
        setTimeout(function(){navigation.navigate('ConfidenceScoreScreen')}, 3000)
        //await dispatch(scanSyllabi(userId, 2, 1, token, props.route.params.base64StringAssignment)); //for assignment
    }

    useEffect(() => {
        if(props.route.params.previousScreen === 'Syllabus'){
            scanOcrSyllabi()
        }else{
            startLoading()
        }
    }, [props, isFocused]);


    return {
        isLoading
    };
  };
  
  export default method;