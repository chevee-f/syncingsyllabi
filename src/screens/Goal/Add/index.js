import React, { useState, useEffect } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image ,
         ScrollView,
         KeyboardAvoidingView
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import Label from '../../../components/Label'
import color from '../../../styles/colors'
import DateTimePicker from '../../../components/DateTimePicker'
import { TextInput } from 'react-native-paper';
import DefaultButton from '../../../components/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dropdown from '../../../components/Dropdown'
import method from './method'
import Moment from 'moment';
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../../components/ConfirmationModal'
import SuccessModal from '../../../components/SuccessModal'

var {height, width} = Dimensions.get('window');

const AddGoal = ({
    onPress,
    setGoalVisible,
    goalVisible,
    goalId,
    setGoalId,
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
        setSuccessModalVisible,
        setConfirmationVisible,
        setAction,
        setConfirmationMessage,
        setHasValue,
        setGoal,
        setOpenMenu,
        handleSelectItem,
        resetGoal,
        onConfirm
    } = method();

    const [startDateVisible, setStartDateVisible] = useState(false);
    const [endDateVisible, setEndDateVisible] = useState(false);

    const { goals } = useSelector(state => state.goalReducer);

    useEffect(() => {
        if(goalVisible){
            if(goalId !== null && !hasValue){
                    let data = goals.filter((item) => item.id == goalId)                  
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
    }, [goalVisible,goal,goalId,goals,hasValue]);

    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                //isVisible={props.modalVisible}
                isVisible={goalVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={() => { setGoalVisible(!goalVisible);
                                           setGoalId(null)
                                           resetGoal() }}
                onBackdropPress={() => { setGoalVisible(!goalVisible);
                                         setGoalId(null)
                                         resetGoal() }}>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => { setGoalVisible(!goalVisible);
                                                           setGoalId(null)
                                                           resetGoal() }}>
                            <Image 
                                source={require('../../../assets/icons/closeButton.png')}
                                resizeMode='contain'
                                style={styles.close}
                            />
                        </TouchableOpacity>
                        <View style={styles.fieldContainer}>
                            <Label text="Type of Goal" />
                            <Dropdown isOpen={openMenu} 
                                      openMenu={() => setOpenMenu(true)} 
                                      onDismiss={() => setOpenMenu(false)}
                                      onSelectItem = { handleSelectItem }
                                      selectedItem = {goal.type}
                                      items = {typeOfGoal} />
                        </View>
                        <View style={[styles.fieldContainer,{zIndex:-5}]}>
                            <Label text="Description of the Goal" />
                            <View style={[styles.inputContainer, {borderColor: color.default,height: height * 0.15}]}>
                                <TextInput
                                    mode="flat"
                                    style={[styles.input,{height: height * 0.16}]}
                                    placeholder="Description of Goal"
                                    selectionColor={color.primary}
                                    activeUnderlineColor={color.primary}
                                    //multiline={true}
                                    //numberOfLines={5}
                                    theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                    value={goal.description}
                                    onChangeText={(description) =>  setGoal({...goal, description: description})}
                                />
                            </View> 
                        </View>
                        <View style={[styles.fieldContainer,{zIndex:-5,flexDirection:'row',justifyContent:'space-between'}]}>
                            <View style={{width: '49%'}}>
                                <Label text="Start Date" />
                                <View style={[styles.inputContainer, {borderColor: color.default}]}>
                                    <TextInput
                                        mode="flat"
                                        style={[styles.input]}
                                        onPressIn={() => { setStartDateVisible(true)}}
                                        placeholder="DD/MM/YYYY"
                                        editable={false}
                                        value={goal.stringStartDate}
                                        selectionColor={color.primary}
                                        activeUnderlineColor={color.primary}
                                        theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                    />
                                </View> 
                            </View>
                            <View style={{width: '49%'}}>
                                <Label text="End Date" />
                                <View style={[styles.inputContainer, {borderColor: color.default}]}>
                                    <TextInput
                                        mode="flat"
                                        style={[styles.input]}
                                        onPressIn={() => { setEndDateVisible(true)}}
                                        placeholder="DD/MM/YYYY"
                                        editable={false}
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
                                                onPress={() => {setAction('Add')
                                                                setConfirmationMessage('Add this Goal?')
                                                                setConfirmationVisible(true)}} />       
                            </View>
                        }
                    </ScrollView>
                </KeyboardAvoidingView>

                <DateTimePicker 
                    onClose={() => setStartDateVisible(!startDateVisible)}
                    modalVisible={startDateVisible} 
                    showTimePicker={false}
                    onChangeDate={(startDate) =>  setGoal({...goal, 
                                                            startDate: startDate,
                                                            stringStartDate: Moment(startDate).format("MM/DD/YYYY")})}
                    onSelectDate={() => setStartDateVisible(!startDateVisible)}
                    //selectedDate={Moment(goal.startDate).format("MM/DD/YYYY")}
                />

                <DateTimePicker 
                    onClose={() => setEndDateVisible(!endDateVisible)}
                    modalVisible={endDateVisible} 
                    showTimePicker={false}
                    onSelectDate={() => setEndDateVisible(!endDateVisible)}
                    onChangeDate={(endDate) =>  setGoal({...goal, 
                                                            endDate: endDate,
                                                            stringEndDate: Moment(endDate).format("MM/DD/YYYY")})}
                    //selectedDate={Moment(goal.endDate).format("MM/DD/YYYY")}
                />

                <ConfirmationModal 
                    modalVisible={confirmationVisible} 
                    confirmationMessage={confirmationMessage}
                    onClose={() => setConfirmationVisible(!confirmationVisible)}
                    onConfirm={() => {onConfirm()
                                      setGoalId(null)
                                      setGoalVisible(!goalVisible)}}
                />

                <SuccessModal 
                    isRemove={action === 'Delete' ? true : false}
                    successModalVisible={successModalVisible} 
                    successMessage={successMessage}
                    onClose={() => setSuccessModalVisible(!successModalVisible)}
                />

          </Modal>
        </SafeAreaView>
    )
}

export default AddGoal;