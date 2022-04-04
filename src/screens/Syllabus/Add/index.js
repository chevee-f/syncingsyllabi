import React, { useState, useEffect, useContext } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image,
         ScrollView,
         TouchableOpacity,
         Platform
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
import method from './method'
import {Context as AuthContext} from '../../../components/Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';

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
        setHasValue,
        setWeekday,
        setClassSyllabus,
        setSelectedColor,
        handleAddSyllabus,
        handleUpdateSyllabus,
        addSchedule,
        handleCallback,
        handleValidClassName,
        handleValidTeacherName,
        resetClassSyllabus
    } = method();

    const [calendarVisible, setCalendarVisible] = useState(false);
    const colors = [0,1,2,3,4,5,6,7,8,9,10,11];

    const { state } = useContext(AuthContext);
    const { syllabus } = useSelector(state => state.syllabusReducer);
    const dispatch = useDispatch();

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
                                     setHasValue(false)
                                     resetClassSyllabus() }}
          onBackdropPress={() => { setModalVisible(!modalVisible);
                                   setSyllabusId(null)
                                   setHasValue(false)
                                   resetClassSyllabus() }}>

            <View style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible);
                                                       setSyllabusId(null)
                                                       setHasValue(false)
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
                                            <Colors selectedColor={item} 
                                                    onPress={() => setSelectedColor(item)} 
                                            />
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
                        <View style={[styles.actionContainer]}>
                            <DefaultButton containerStyle={{width: width * 0.44}} title="Remove" />    
                            <DefaultButton containerStyle={{width: width * 0.44}} 
                                           title="Update" 
                                           onPress={() => { handleUpdateSyllabus()
                                                            setModalVisible(!modalVisible)
                                                            setSyllabusId(null)
                                                            setHasValue(false)}}/>         
                        </View> :
                        <View style={styles.fieldContainer}>
                            <DefaultButton title="Save" 
                                    onPress={() => { handleAddSyllabus()
                                                     setModalVisible(!modalVisible)
                                                     setSyllabusId(null)
                                                     setHasValue(false)}}
                            />       
                        </View>
                    }
                </ScrollView>
            </View>

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
                onSelectDate={() => setCalendarVisible(!calendarVisible)}
            />
          </Modal>

          
      </SafeAreaView>
            
        
    )
}

export default AddSyllabus;