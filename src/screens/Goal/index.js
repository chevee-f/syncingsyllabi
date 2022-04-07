import React, { useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TabButton from './../../components/TabButton'
import DropDownPicker from 'react-native-dropdown-picker';
import Card from '../../components/Card/Item'
import styles from './styles'
import label from '../../styles/label'
import color from '../../styles/colors'
import method from './method'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalByUser } from '../../actions/goal';
import AddGoal from '../../screens/Goal/Add'
import ConfirmationModal from '../../components/ConfirmationModal'
import SuccessModal from '../../components/SuccessModal'

const GoalScreen = ({ navigation }) => {
    const {
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
    } = method();

    const { state } = useContext(AuthContext);
    const { goals } = useSelector(state => state.goalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let userId = state.userId
        let token = state.token
        dispatch(getGoalByUser(userId, token));
    }, [goals.length]);

    return (
      <View>
        <View style={styles.header}>
          {typeOfGoal.map((item) => {
                return (
                  <TabButton title={item.name} 
                             isActive={item.value === activeTab}
                             onSelect={onSelect}
                             value={item.value} />
                );
          })}     
        </View>
        
        <View style={styles.sortContainer}>
            <Text style={[label.boldExtraSmallHeading, {color: color.default, marginLeft:10}]}>Sort by</Text>
            <DropDownPicker
                open={false}
                //setOpen={setOpen}
                items={[
                    {label: 'Item 1', value: 'item1'},
                    {label: 'Item 2', value: 'item2', selected: true},
                ]}

                containerStyle={styles.containerStyle}
                style={styles.dropDown}
                placeholderStyle={styles.placeHolder}
                placeholder="Due Date"
            />
        </View>
        <Card data={goals.filter((x) => x.goalType == activeTab)} 
              onClickAction={onClickAction} />

        <AddGoal 
            onClose={() => { setGoalVisible(!goalVisible); }}
            goalVisible={goalVisible} 
            setGoalVisible={setGoalVisible}
            goalId={goalId}
            setGoalId={setGoalId}
        />
        <ConfirmationModal 
            modalVisible={confirmationVisible} 
            confirmationMessage={confirmationMessage}
            onClose={() => setConfirmationVisible(!confirmationVisible)}
            onConfirm={() => onConfirm()}
        />

        <SuccessModal 
            isRemove={action === 'Delete' ? true : false}
            successModalVisible={successModalVisible} 
            successMessage={successMessage}
            onClose={() => setSuccessModalVisible(!successModalVisible)}
        />

      </View>
    )
}

export default GoalScreen;