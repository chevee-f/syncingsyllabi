import React, { useState } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image ,
         ScrollView
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

var {height, width} = Dimensions.get('window');

const AddGoal = ({
    onPress,
    setGoalVisible,
    goalVisible,
    ...props
  }) => {

    const {
        openMenu,
        goal,
        typeOfGoal,
        setGoal,
        setOpenMenu,
        handleSelectItem,
        handleAddGoal,
        validateDate
    } = method();

    const [startDateVisible, setStartDateVisible] = useState(false);
    const [endDateVisible, setEndDateVisible] = useState(false);

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
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={styles.modalContainer}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => { setGoalVisible(!goalVisible); }}>
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
                                    multiline={true}
                                    numberOfLines={5}
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
                                        value={goal.startDate}
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
                                        value={goal.endDate}
                                        selectionColor={color.primary}
                                        activeUnderlineColor={color.primary}
                                        theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                    />
                                </View> 
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <DefaultButton title="Save" onPress={() => {handleAddGoal() 
                                                                        setGoalVisible(!goalVisible); }} />       
                        </View>
                    </ScrollView>
                </View>
                <DateTimePicker 
                    onClose={() => { setStartDateVisible(!startDateVisible); }}
                    modalVisible={startDateVisible} 
                    showTimePicker={false}
                    onChangeDate={(startDate) =>  setGoal({...goal, startDate: Moment(startDate).format("MM/DD/YYYY")})}
                    onSelectDate={() => { validateDate()
                                          setStartDateVisible(!startDateVisible); }}
                    selectedDate={goal.startDate}
                />
                <DateTimePicker 
                    onClose={() => { setEndDateVisible(!endDateVisible); }}
                    modalVisible={endDateVisible} 
                    showTimePicker={false}
                    onSelectDate={() => { validateDate()
                                          setEndDateVisible(!endDateVisible); }}
                    onChangeDate={(endDate) =>  setGoal({...goal, endDate: Moment(endDate).format("MM/DD/YYYY")})}
                    selectedDate={goal.endDate}
                />
          </Modal>
        </SafeAreaView>
    )
}

export default AddGoal;