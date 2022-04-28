import React, { useContext, useEffect } from 'react';
import { Text, View, Platform, Dimensions, TouchableOpacity } from 'react-native';
import TabButton from './../../components/TabButton'
import DropDownPicker from 'react-native-dropdown-picker';
import Card from '../../components/Card/Item'
import styles from './styles'
import label from '../../styles/label'
import color from '../../styles/colors'
import method from './method'
import {Context as AuthContext} from '../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getGoalByUser, getGoalByUserSortBy } from '../../actions/goal';
import AddGoal from '../../screens/Goal/Add'
import ConfirmationModal from '../../components/ConfirmationModal'
import SuccessModal from '../../components/SuccessModal'
import Icon from 'react-native-vector-icons/Ionicons';

var {height, width} = Dimensions.get('window');

const GoalScreen = props => {
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
      isOpenMenu,
      selectedItem,
      setSelectedItem,
      setIsOpenMenu,
      setSuccessModalVisible,
      setConfirmationVisible,
      setGoalId,
      setGoalVisible,
      onSelect,
      onClickAction,
      onConfirm,
      handleCallback
    } = method();

    const { state } = useContext(AuthContext);
    const { goals } = useSelector(state => state.goalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let userId = state.userId
        let token = state.token
        dispatch(getGoalByUserSortBy(userId, token, selectedItem));
    }, [goals.length, selectedItem]);

    React.useLayoutEffect(() => {
      props.navigation.setOptions({
          headerStyle:{
            backgroundColor: color.primary
          },
          title: '',
          headerTintColor:'#fff',
          header: () => <View style={[styles.headerContainer,{height: Platform.OS === 'ios' ? height * 0.11 : height * 0.13}]}>
                          <View style={styles.titleContainer}>
                              <Text style={[label.boldMediumHeading, {color: color.textDefault,textAlign:'right', width:'57%'}]}>
                                Goals
                              </Text>
                              <TouchableOpacity onPress={() => setGoalVisible(true)}>
                                  <Icon name="add-outline" color={color.textDefault} size={40} />
                              </TouchableOpacity>
                          </View>
                        </View>
      });
    }, [props.navigation]);

    return (
      <View>
        <View style={[styles.header,{backgroundColor: state.isDarkTheme === 'true' ? color.darkTheme : '#fff'}]}>
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
                open={isOpenMenu}
                setOpen={() => setIsOpenMenu(true)} 
                onClose={() => setIsOpenMenu(false)}
                items={[
                    {label: 'Due Date', value: 7},
                    {label: 'Alphabetical', value: 4}
                ]}
                containerStyle={styles.containerStyle}
                style={styles.dropDown}
                value={selectedItem}
                onSelectItem={(item) => {
                  setSelectedItem(item.value)
                }}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                textStyle={[styles.text, {color:  state.isDarkTheme === 'true' ? color.default : color.primary}]}
            />
        </View>
        <Card data={activeTab === 4 ? goals.filter((x) => x.isArchived == true && x.isCompleted == false) : 
                    goals.filter((x) => x.goalType == activeTab && x.isArchived == false && x.isCompleted == false)} 
              onClickAction={onClickAction} />

        <AddGoal 
            onClose={() => { setGoalVisible(!goalVisible); }}
            goalVisible={goalVisible} 
            setGoalVisible={setGoalVisible}
            goalId={goalId}
            setGoalId={setGoalId}
            setTab = {handleCallback}
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
            headerText={action === 'Complete' ? 'Congratulations' : 'Success'}
            onClose={() => setSuccessModalVisible(!successModalVisible)}
        />

      </View>
    )
}

export default GoalScreen;