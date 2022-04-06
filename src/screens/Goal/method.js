import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../components/Context/AuthContext';
import Moment from 'moment';
import { updateGoal, removeGoal } from '../../actions/goal'

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { goals } = useSelector(state => state.goalReducer);
    const dispatch = useDispatch();
    
    const [hasError, setHasError] = useState(false);
    const [goalVisible, setGoalVisible] = useState(false);
    const [goalId, setGoalId] = useState(null);
    const [successModalVisible, setSuccessModalVisible] = React.useState(false)
    const [confirmationVisible, setConfirmationVisible] = React.useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [action, setAction] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const typeOfGoal = [
      {name: 'Short-Term', value: 1},
      {name: 'Medium-Term', value: 2},
      {name: 'Long-Term', value: 3},
      {name: 'Archived', value: 4}
    ]

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

    const resetGoal = () => {
      setGoal({...goal,        
                  id: '',
                  title: '',
                  type: '',
                  description: '',
                  startDate: null,
                  endDate: null,
                  stringStartDate: '',
                  stringEndDate: '',
                  isArchived: false,
                  isCompleted: false
              })
    }

    useEffect(() => {
      if(error.length !== 0) setHasError(true)
      if(goal.isCompleted || goal.isArchived){
        handleUpdateGoal()
      }
    }, [error, goal]);

    const onSelect = (value) => {
      setActiveTab(value)
    }
    
    const onClickAction = (action,id) => {
      setGoalId(id)
      setAction(action)
      if(action === 'Edit'){
       setGoalVisible(true)
      }else if(action === 'Complete'){
        setConfirmationMessage('Complete this Goal?')
        setConfirmationVisible(true)
      }else if(action === 'Archive'){
        setConfirmationMessage('Archive this Goal?')
        setConfirmationVisible(true)
      }else{
        setConfirmationMessage('Remove this Goal?')
        setConfirmationVisible(true)
      }
    }

    const onConfirm = () => {
      setConfirmationVisible(!confirmationVisible)
      if(action === 'Delete'){
        handleRemoveGoal()
      }else{
        let data = goals.filter((item) => item.id == goalId)                  
        setGoal({...goal, 
                    id: goalId,
                    title: data[0].goalTitle,
                    type: data[0].goalType,
                    description: data[0].goalDescription,
                    startDate: data[0].goalDateStart,
                    endDate: data[0].goalDateEnd,
                    stringStartDate: Moment(data[0].goalDateStart).format("MM/DD/YYYY"),
                    stringEndDate: Moment(data[0].goalDateEnd).format("MM/DD/YYYY"),
                    isCompleted: action === 'Complete' ? true : data[0].isCompleted,
                    isArchived: action === 'Archive' ? true : data[0].isArchived         
                })
      }
    }

    const handleUpdateGoal = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(updateGoal(goal, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            if(action === 'Complete'){
              setSuccessMessage('You just completed one of your Goals!')
              resetGoal()
              setTimeout(function(){setSuccessModalVisible(true)}, 1000)
            }else{
              resetGoal()
              Alert.alert('Success', 'Your goal has been moved to archive');
            }
        }
    }

    const handleRemoveGoal = async() => {
        let userId = state.userId
        let token = state.token
        await dispatch(removeGoal(goalId, userId, token))
        if(hasError){
            Alert.alert("Error", error);
        }else{
            setSuccessMessage('You just removed one of your goals!')
            resetGoal()
            setTimeout(function(){setSuccessModalVisible(true)}, 1000)
        }
    }

    return {
      typeOfGoal,
      activeTab,
      goalVisible,
      goalId,
      confirmationMessage,
      confirmationVisible,
      successMessage,
      successModalVisible, 
      action,
      setSuccessModalVisible,
      setConfirmationVisible,
      setGoalId,
      setGoalVisible,
      onSelect,
      onClickAction,
      onConfirm
    };
  };
  
  export default method;