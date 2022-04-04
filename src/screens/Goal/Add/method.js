import React, { useState,useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Context as AuthContext} from '../../../components/Context/AuthContext';

const method = () => {
   
    const { state } = useContext(AuthContext);
    const { error } = useSelector(state => state.errorReducer);
    const { syllabus } = useSelector(state => state.syllabusReducer);

    const dispatch = useDispatch();
    const [hasError, setHasError] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [goal, setGoal] = useState({
        id: '',
        userId: '',
        title: '',
        type: '',
        description: '',
        startDate: null,
        endDate: null
    });

    const typeOfGoal = [
        {label: 'Short-Term', value: 1},
        {label: 'Medium-Term', value: 2},
        {label: 'Long-Term', value: 3}
    ]

    useEffect(() => {
        
    }, [error]);

  

    const handleSelectItem = (item) => {
        setGoal({...goal, type: item})
    }

    const handleAddGoal = async() => {
        alert(JSON.stringify(goal))
    }

    const validateDate = () => {
        if(goal.startDate !== null && goal.endDate !== null){
            if(goal.startDate > goal.endDate){
                Alert.alert('Invalid date', 'Start date should be less than end date',
                    [{ text: "OK", onPress: () => {setGoal({...goal, 
                                                            startDate: null,
                                                            endDate: null
                                                          })
                    }}],
                    { cancelable: false }
                );
            }
        }
    }

    return {
        openMenu,
        goal,
        typeOfGoal,
        setGoal,
        setOpenMenu,
        handleSelectItem,
        handleAddGoal,
        validateDate
    };
  };
  
  export default method;