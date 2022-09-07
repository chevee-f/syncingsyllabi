import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAssignments, updateAssignment, deleteAssignment, completeAssignment, getAssignmentsByUser } from '../../../actions/assignments';

const method = (classSyllabi,setClassSyllabi) => {
    
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [successTitle, setSuccessTitle] = useState('');
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [hasError, setHasError] = useState(false);
    
    const { syllabus } = useSelector(state => state.syllabusReducer);

    useEffect(() => {
        if(classSyllabi.classCode !== ''){
            let classCode = classSyllabi.classCode.replace(/[ )(]/g,'');
            let syllabi = syllabus.find(x => x.classCode === classCode)
            if(syllabi !== undefined) setClassSyllabi({...classSyllabi, id: syllabi.id})
        }
    }, [syllabus]);

    const handleSaveAssignments = async(assignments) => {
        console.log("is saving...=====================")
        // console.log(assignments)
        let userId = state.userId;
        let token = await AsyncStorage.getItem('userToken');
        let pad = function(num) { return ('00'+num).slice(-2) };
        let count = 1;
        assignments.map(async (assignment) => {
            if(assignment.included) {
                let data = assignment;
                let date = new Date(assignment.dueDate);
                date = date.getUTCFullYear()         + '-' +
                        pad(date.getUTCMonth() + 1)  + '-' +
                        pad(date.getUTCDate())       + 'T' +
                        pad(date.getUTCHours())      + ':' +
                        pad(date.getUTCMinutes())    + ':' +
                        pad(date.getUTCSeconds());
                // // setClassAssignments({ ...classAssignments, dueDate: date });
                console.log(assignment)
                data.syllabusId = assignment.syllabi;
                data.notes = assignment.note;
                data.attachments = null;
                await dispatch(addAssignments(data, userId, token, date));
                if(hasError){
                    Alert.alert("Error", error);
                }else{
                    setSuccessMessage(count + ' Assignments has been created!');
                    setSuccessTitle('Congratulations!');
                    setSuccessModalVisible(true);
                }
                count++;
            }
        })
    }

    return{
        successMessage,
        successTitle,
        successModalVisible,
        handleSaveAssignments,
        setSuccessMessage,
        setSuccessTitle,
        setSuccessModalVisible
    }
}

export default method;