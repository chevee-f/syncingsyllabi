import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { addGoal, updateGoal, removeGoal } from '../../../actions/goal'

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [action, setAction] = React.useState('')
    const [confirmationVisible, setConfirmationVisible] = React.useState('')
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = useState('');

    const [goal, setGoal] = useState({
        id: '',
        title: '',
        type: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        stringStartDate: '',
        stringEndDate: '',
        isArchived: false,
        isCompleted: false
    });

    const typeOfGoal = [
        {label: 'Short-Term', value: 1},
        {label: 'Medium-Term', value: 2},
        {label: 'Long-Term', value: 3}
    ]

    useEffect(() => {
        if(error.length !== 0) setHasError(true)
    }, [error]);

  

    const handleSelectItem = (item) => {
        setGoal({...goal, type: item})
    }

    const handleAddGoal = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(addGoal(goal, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            resetGoal()
        }
    }

    const handleUpdateGoal = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(updateGoal(goal, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            //setSuccessMessage('Your goal has been updated!')
            resetGoal()
            //setTimeout(function(){setSuccessModalVisible(true)}, 1000)
        }
    }

    const handleRemoveGoal = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(removeGoal(goal.id, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            resetGoal()
        }
    }

    const resetGoal = () => {
        setGoal({...goal,        
                    id: '',
                    title: '',
                    type: '',
                    description: '',
                    startDate: null,
                    endDate: null,
                    stringStartDate: '',
                    stringEndDate: ''
                })
        setHasValue(false)
    }

    const onConfirm = () => {
        setConfirmationVisible(!confirmationVisible)
        if(goal.type === ''){
            Alert.alert('Invalid Type of Goal', 'Type of Goal field could not be empty')
        }else if(goal.startDate > goal.endDate){
            Alert.alert('Invalid date', 'Start date should be less than end date',
                [{ text: "OK", onPress: () => {setGoal({...goal, startDate: null, endDate: null})}}],
                { cancelable: false }
            );
        }else if(goal.stringStartDate === '' || goal.stringEndDate === ''){
            Alert.alert('Invalid Date', 'Start Date and End Date could not be empty')
        }else{
            if(action === 'Add'){
                handleAddGoal()
            }
            else if(action === 'Update'){
                handleUpdateGoal()
            }else{
                handleRemoveGoal()
            }
            setHasValue(false)
        }
    }

    return {
        openMenu,
        goal,
        typeOfGoal,
        hasValue,
        confirmationMessage,
        confirmationVisible,
        action,
        successMessage,
        successModalVisible,
        setSuccessModalVisible,
        setConfirmationVisible,
        setAction,
        setConfirmationMessage,
        setHasValue,
        setGoal,
        setOpenMenu,
        handleSelectItem,
        handleAddGoal,
        resetGoal,
        onConfirm
    };
  };
  
  export default method;