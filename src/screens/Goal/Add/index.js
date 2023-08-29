import React, { useState, useEffect, useContext } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image,
         ScrollView,
         TouchableOpacity,
         KeyboardAvoidingView, Text
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Label from '../../../components/Label'
import color from '../../../styles/colors'
import DateTimePicker from '../../../components/DateTimePicker'
import { TextInput } from 'react-native-paper';
import DefaultButton from '../../../components/DefaultButton';
import Dropdown from '../../../components/Dropdown'
import method from './method'
import Moment from 'moment';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../../components/ConfirmationModal'
import SuccessModal from '../../../components/SuccessModal'
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import NotAvailableModal from '../../../components/NotAvailableModal';

var {height, width} = Dimensions.get('window');

const AddGoal = ({
    onPress,
    setGoalVisible,
    goalVisible,
    goalId,
    setGoalId,
    setTab,
    ...props
  }) => {

    const {
        openMenu,
        goal,
        typeOfGoal,
        hasValue,
        confirmationMessage,
        confirmationVisible,
        action,
        successMessage,
        successModalVisible,
        notAvailableModalVisible,
        setNotAvailableModalVisible,
        setSuccessModalVisible,
        setConfirmationVisible,
        setAction,
        setConfirmationMessage,
        setHasValue,
        setGoal,
        setOpenMenu,
        handleSelectItem,
        resetGoal,
        onConfirm,
        handleSaveGoal
    } = method();

    const [startDateVisible, setStartDateVisible] = useState(false);
    const [endDateVisible, setEndDateVisible] = useState(false);

    const { state } = useContext(AuthContext);
    const { goals } = useSelector(state => state.goalReducer);

    const setActiveTab = (index) => {
        if(setTab !== undefined) setTab(index);
    }

    useEffect(() => {
        if(goalVisible){
            if(goalId !== null && !hasValue){
                let data = goals.filter((item) => item.id == goalId)     
                if(data.length > 0){
                    setGoal({...goal, 
                        id: goalId,
                        title: data[0].goalTitle,
                        type: data[0].goalType,
                        description: data[0].goalDescription,
                        startDate: data[0].goalDateStart,
                        endDate: data[0].goalDateEnd,
                        stringStartDate: Moment(data[0].goalDateStart).format("MM/DD/YYYY"),
                        stringEndDate: Moment(data[0].goalDateEnd).format("MM/DD/YYYY")                
                    })
                    setHasValue(true)
                }             
            }
        }
    }, [goalVisible,goal,goalId,goals,hasValue]);

    return (
        // <SafeAreaView>
        <>
      <View style={styles.container}>
            <Modal
                style={{
                    margin: 0,
                    justifyContent: 'flex-end'
                }} 
                
                transparent={true} 
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
                backdropOpacity={0.4}
                avoidKeyboard
                isVisible={goalVisible}
                onBackButtonPress={() => {setGoalVisible(!goalVisible);
                                          setGoalId(null)
                                          resetGoal() 
                                         }}
                onBackdropPress={() => {setGoalVisible(!goalVisible);
                                        setGoalId(null)
                                        resetGoal() 
                                       }}>
                
                <DateTimePicker 
                    onClose={() => setStartDateVisible(!startDateVisible)}
                    modalVisible={startDateVisible} 
                    showTimePicker={false}
                    onChangeDate={(startDate) =>  setGoal({...goal, 
                                                            startDate: startDate,
                                                            stringStartDate: Moment(startDate).format("MM/DD/YYYY")})}
                    onSelectDate={() => setStartDateVisible(!startDateVisible)}
                    selectedDate={goal.startDate ? goal.startDate : new Date()}
                />

                <DateTimePicker 
                    onClose={() => setEndDateVisible(!endDateVisible)}
                    modalVisible={endDateVisible} 
                    showTimePicker={false}
                    onSelectDate={() => setEndDateVisible(!endDateVisible)}
                    onChangeDate={(endDate) =>  setGoal({...goal, 
                                                            endDate: endDate,
                                                            stringEndDate: Moment(endDate).format("MM/DD/YYYY")})}
                    selectedDate={goal.endDate ? goal.endDate : new Date()}
                />

                <ConfirmationModal 
                    modalVisible={confirmationVisible} 
                    confirmationMessage={confirmationMessage}
                    onClose={() => setConfirmationVisible(!confirmationVisible)}
                    onConfirm={() => {onConfirm()
                                      setGoalId(null)}}
                />

                <SuccessModal 
                    isRemove={action === 'Delete' ? true : false}
                    successModalVisible={successModalVisible} 
                    successMessage={successMessage}
                    headerText='Success'
                    onClose={() => {setSuccessModalVisible(!successModalVisible)
                                    setGoalVisible(!goalVisible)
                                    setActiveTab(goal.type)
                                    resetGoal()}}
                />
                <NotAvailableModal
                    isVisible={notAvailableModalVisible}
                    onClose={() => {setNotAvailableModalVisible(false)}} />

                <View style={{
                    height: '66%',
                    marginTop: 'auto',
                    backgroundColor:'white',
                    position: 'relative',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                    alignItems: 'flex-end'
                }}>

                    <TouchableOpacity style={{
                        width: 50, 
                        padding: 10
                    }} onPress={() => { setGoalVisible(!goalVisible);
                                                            setGoalId(null)
                                                            resetGoal() }}>
                        <Image 
                            source={require('../../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close}
                        />
                    </TouchableOpacity>
                    <ScrollView style={{}}>
                        <View style={{ marginHorizontal: 13 }}>
                            <View style={styles.fieldContainer}>
                                <Label text="Type of Goal" isDarkTheme={state.isDarkTheme === 'true'} />
                                <Dropdown isOpen={openMenu} 
                                        openMenu={() => setOpenMenu(true)} 
                                        onDismiss={() => setOpenMenu(false)}
                                        onSelectItem = { handleSelectItem }
                                        selectedItem = {goal.type}
                                        items = {typeOfGoal} />
                            </View>
                            <View style={[styles.fieldContainer,{zIndex:-5}]}>
                                <Label text="Title" isDarkTheme={state.isDarkTheme === 'true'} />
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        mode="flat"
                                        style={styles.input}
                                        value={goal.title}
                                        selectionColor={color.primary}
                                        activeUnderlineColor={color.primary}
                                        onChangeText={(title) =>  setGoal({...goal, title: title})} />
                                </View>
                            </View>
                            {/* <View style={[styles.fieldContainer,{zIndex:-5}]}>
                                <Label text="Description" isDarkTheme={state.isDarkTheme === 'true'} />
                                    <TextInput
                                        // mode="flat"
                                        style={[styles.input,{marginTop: 10, marginBottom: 24, paddingTop: 10}]}
                                        placeholder="Description of Goal"
                                        selectionColor={color.primary}
                                        activeUnderlineColor={color.primary}
                                        multiline={true}
                                        numberOfLines={8}
                                        theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                        value={goal.description}
                                        onChangeText={(description) =>  setGoal({...goal, description: description})}
                                    />
                            </View> */}
                            <View style={{zIndex:-5, marginTop: 24}}>
                                <Label text="Action Plan to Achieve Goal" />
                                <TextInput 
                                    multiline
                                    mode="outlined"
                                    outlineColor="#faf6ea"
                                    style={{height: 200, marginTop: 10, marginBottom: 24, textAlignVertical: 'top', shadowColor: '#171717',backgroundColor: '#fbfbfb',
                                    shadowOffset: {width: 0, height: 0},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,}}
                                    value={goal.description}
                                    onChangeText={(description) =>  setGoal({...goal, description: description})}
                                />
                            </View>
                            <View style={[styles.fieldContainer,{zIndex:-5,flexDirection:'row',justifyContent:'space-between'}]}>
                                <View style={{width: '49%'}}>
                                    <Label text="Start Date" isDarkTheme={state.isDarkTheme === 'true'} />
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            mode="flat"
                                            style={[styles.input]}
                                            onPressIn={() => { setStartDateVisible(true)}}
                                            placeholder="DD/MM/YYYY"
                                            editable={Platform.OS == 'ios' ? false : true}
                                            value={goal.stringStartDate}
                                            selectionColor={color.primary}
                                            activeUnderlineColor={color.primary}
                                            theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                        />
                                    </View> 
                                </View>
                                <View style={{width: '49%'}}>
                                    <Label text="End Date" isDarkTheme={state.isDarkTheme === 'true'} />
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            mode="flat"
                                            style={[styles.input]}
                                            onPressIn={() => { setEndDateVisible(true)}}
                                            placeholder="DD/MM/YYYY"
                                            editable={Platform.OS == 'ios' ? false : true}
                                            value={goal.stringEndDate}
                                            selectionColor={color.primary}
                                            activeUnderlineColor={color.primary}
                                            theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                        />
                                    </View> 
                                </View>
                            </View>
                            {goalId !== null ?
                                <View style={styles.actionContainer}>
                                    <DefaultButton containerStyle={{width: width * 0.44, backgroundColor: color.error }} 
                                                    title="Remove" 
                                                    onPress={() => {setAction('Delete')
                                                                    setConfirmationMessage('Remove this Goal?')
                                                                    setConfirmationVisible(true)}}/>    
                                    <DefaultButton containerStyle={{width: width * 0.44}} 
                                                    title="Update" 
                                                    onPress={() => {setAction('Update')
                                                                    setConfirmationMessage('Update this Goal?')
                                                                    setConfirmationVisible(true)}}/>         
                                </View> :
                                <View style={styles.fieldContainer}>
                                    <DefaultButton title="Save"
                                                    onPress={() => {handleSaveGoal()}} />       
                                </View>
                                
                            }
                            <View style={{height: 34}}></View>
                        </View>
                    </ScrollView>
                    
                </View>

          </Modal>
          </View>
          </>
        // </SafeAreaView>
    )
}

export default AddGoal;