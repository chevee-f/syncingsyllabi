import React, { useState,useContext, useEffect } from 'react';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { scanSyllabi } from '../../actions/ocr';
import { useNavigation } from '@react-navigation/native';

const method = (props) => {

    const { state } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { ocrResults } = useSelector(state => state.ocrReducer);

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [isExecuted, setIsExecuted] = useState(false);

    const startLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("SetUpScreen")
        }, 3000);
    };

    const getOcrSyllabi = async () => {
        await setIsExecuted(true)
        let userId = state.userId
        let token = state.token
        await dispatch(scanSyllabi(userId, 1, token,props.route.params.base64String));
    }

    useEffect(() => {

        if(props.route.params.previousScreen === 'Syllabus'){
            if(!isExecuted) getOcrSyllabi()
            if(ocrResults.length !== 0) navigation.navigate('ConfidenceScoreScreen', {syllabusOcrResult: ocrResults})
        }else{
            startLoading()
        }
    }, [ocrResults]);


    return {
        isLoading
    };
  };
  
  export default method;