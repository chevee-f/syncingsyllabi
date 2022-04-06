import React, { useState, useEffect } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image,
         ScrollView,
         TouchableOpacity,
         Platform,
         KeyboardAvoidingView,
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import AddItem from '../../../components/AddItem'
import Label from '../../../components/Label'
import DefaultInput from '../../../components/DefaultInput';
import WeekdayTimePicker from '../../../components/WeekdayTimePicker'
import Colors from '../../../components/GradientColor'
import GradientItem from '../../../components/GradientItem'
import DefaultButton from '../../../components/DefaultButton';
import ConfirmationModal from '../../../components/ConfirmationModal'
import method from './method'
import color from '../../../styles/colors'
import { useSelector } from 'react-redux';

var {height, width} = Dimensions.get('window');

const AddSyllabus = ({
    onPress,
    setModalVisible,
    modalVisible,
    syllabusId,
    setSyllabusId,
    ...props
  }) => {

    const {
        bgColor,
        selectedColor,
        classSyllabus,
        weekday,
        inputValidation,
        hasValue,
        confirmationMessage,
        confirmationVisible,
        setConfirmationVisible,
        setAction,
        setHasValue,
        setConfirmationMessage,
        setWeekday,
        setClassSyllabus,
        setSelectedColor,
        addSchedule,
        handleCallback,
        handleValidClassName,
        handleValidTeacherName,
        resetClassSyllabus,
        onConfirm
    } = method();

    const [calendarVisible, setCalendarVisible] = useState(false);
    const colors = [0,1,2,3,4,5,6,7,8,9,10,11];

    const { syllabus } = useSelector(state => state.syllabusReducer);

    useEffect(() => {
        if(modalVisible){
            if(syllabusId !== null && !hasValue){
                    let data = syllabus.filter((item) => item.id == syllabusId)
                    let dataArray = [];  
                    data[0].classSchedule.map(
                        function(data){
                            dataArray.push({schedule: data});
                        }
                    )
                    setClassSyllabus({...classSyllabus, 
                                        id: syllabusId,
                                        className: data[0].className,
                                        teacherName: data[0].teacherName,
                                        schedule: !data[0].classSchedule ? '' : data[0].classSchedule.map(function(data){return data;}).join("|"),
                                        scheduleStartTime: new Date(),
                                        scheduleEndTime: new Date(),
                                        scheduleList: dataArray
                                    })
                    setSelectedColor(parseInt(data[0].colorInHex))             
                    setHasValue(true)
            }
        }
    }, [modalVisible,classSyllabus,syllabusId,syllabus,hasValue]);

    return (
        <SafeAreaView>
        <Modal
          useNativeDriver={true}
          backdropColor='rgba(0, 0, 0, 0.7)'
          backdropOpacity={0.5}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          style={styles.modal}
          onBackButtonPress={() => { setModalVisible(!modalVisible);
                                     setSyllabusId(null)
                                     resetClassSyllabus() }}
          onBackdropPress={() => { setModalVisible(!modalVisible);
                                   setSyllabusId(null)
                                   resetClassSyllabus() }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
            <ScrollView>
                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible);
                                                       setSyllabusId(null)
                                                       resetClassSyllabus() }}>
                        <Image 
                            source={require('../../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close}
                        />
                    </TouchableOpacity>
                    <View style={styles.fieldContainer}>
                        <Label text={`${syllabusId === null ? 'Add' : 'Update'} your Syllabus`} />
                        <AddItem />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Input the Class Name or Class Code" />
                        <DefaultInput 
                            label="Class Name"
                            value={classSyllabus.className}
                            onChangeText={(className) =>  setClassSyllabus({...classSyllabus, className: className})}
                            hasValue={classSyllabus.className.length}
                            hasError={!inputValidation.isValidClassName}
                            errorMsg={inputValidation.classNameErrMsg}
                            onEndEditing={(e)=>handleValidClassName(e.nativeEvent.text)}    
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="What's the name of your teacher?" />
                        <DefaultInput 
                            label="Name of Teacher"
                            value={classSyllabus.teacherName}
                            onChangeText={(teacherName) =>  setClassSyllabus({...classSyllabus, teacherName: teacherName})}
                            hasValue={classSyllabus.teacherName.length}
                            hasError={!inputValidation.isValidTeacherName}
                            errorMsg={inputValidation.teacherNameErrMsg}
                            onEndEditing={(e)=>handleValidTeacherName(e.nativeEvent.text)}    
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="What's your Schedule?" />
                            {Platform.OS === 'android' ?
                                <TouchableOpacity activeOpacity={1.0} onPress={() => setCalendarVisible(true)}>
                                    <View>
                                        <DefaultInput 
                                            label="Schedule"
                                            editable={false}
                                            value={classSyllabus.schedule}
                                            hasValue={classSyllabus.schedule.length}
                                            hasError={!inputValidation.isValidSchedule}
                                            errorMsg={inputValidation.scheduleErrMsg}  
                                        /> 
                                    </View>
                                </TouchableOpacity> : 
                                 <DefaultInput 
                                    label="Schedule"
                                    onPressIn={() => { setCalendarVisible(true)}}
                                    editable={false}
                                    value={classSyllabus.schedule}
                                    hasValue={classSyllabus.schedule.length}
                                    hasError={!inputValidation.isValidSchedule}
                                    errorMsg={inputValidation.scheduleErrMsg}
                                /> 
                            }
                          
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Pick a color" />
                        <View style={{flexDirection:'row'}}>
                            <ScrollView horizontal>
                                {
                                    colors.map((item) => {
                                        return (
                                            <Colors selectedColor={item} onPress={() => setSelectedColor(item)} />
                                        );
                                    })                
                                }              
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Preview" />
                        <GradientItem 
                            containerStyle={{alignSelf:'center'}}
                            code={classSyllabus.className}
                            name={classSyllabus.teacherName}
                            schedule={classSyllabus.schedule}
                            selectedBgColor={bgColor[selectedColor]}
                        />
                    </View>
                    {syllabusId !== null ?
                        <View style={styles.actionContainer}>
                            <DefaultButton containerStyle={{width: width * 0.44, backgroundColor: color.error}} 
                                            title="Remove" 
                                            onPress={() => {setAction('Delete')
                                                            setConfirmationMessage('Remove this Syllabi?')
                                                            setConfirmationVisible(true)}}/>    
                            <DefaultButton containerStyle={{width: width * 0.44}} 
                                           title="Update" 
                                           onPress={() => {setAction('Update')
                                                           setConfirmationMessage('Update this Syllabi?')
                                                           setConfirmationVisible(true)}}/>         
                        </View> :
                        <View style={styles.fieldContainer}>
                            <DefaultButton title="Save" 
                                    onPress={() => {setAction('Add')
                                                    setConfirmationMessage('Add this Syllabi?')
                                                    setConfirmationVisible(true)}}
                            />       
                        </View>
                    }
            </ScrollView>
        </KeyboardAvoidingView>                               
            <WeekdayTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
                showTimePicker={true}
                title='Select day and time' 
                weekday={weekday}
                setWeekday={setWeekday}
                startTime={classSyllabus.scheduleStartTime}
                onChangeStartTime={(startTime) =>  setClassSyllabus({...classSyllabus, scheduleStartTime: startTime})}
                onChangeEndTime={(endTime) =>  setClassSyllabus({...classSyllabus, scheduleEndTime: endTime})}
                endTime={classSyllabus.scheduleEndTime}
                list={classSyllabus.scheduleList}
                add={() => addSchedule()}
                parentCallback = {handleCallback}
                onConfirm={() => setCalendarVisible(!calendarVisible)}
            />

            <ConfirmationModal 
                modalVisible={confirmationVisible} 
                confirmationMessage={confirmationMessage}
                onClose={() => setConfirmationVisible(!confirmationVisible)}
                onConfirm={() => {onConfirm()
                                  setSyllabusId(null)
                                  setModalVisible(!modalVisible)}}
            />
          </Modal>
      </SafeAreaView>
            
        
    )
}

export default AddSyllabus;