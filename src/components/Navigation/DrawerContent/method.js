import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { getSyllabusByUser } from '../../../actions/syllabus';

const method = () => {

    const { state } = useContext(AuthContext);
    const { goals } = useSelector(state => state.goalReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [syllabusId, setSyllabusId] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const data = [
        {
            title: 'Classes',
            count: syllabus.length
        },{
            title: 'Goals',
            count: goals.length
        },{
            title: 'Friends',
            count: '7'
        },
    ];

    useEffect(() => {
        let userId = state.userId
        let token = state.token
        dispatch(getSyllabusByUser(userId, token));
    }, [syllabus.length,goals.length]);
  
    return {
        data,
        modalVisible,
        syllabusId,
        imageLoading,
        setImageLoading,
        setSyllabusId,
        setModalVisible
    };
  };
  
  export default method;