import React, { useState } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image,
         Text,
         ScrollView, Alert
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import AddItem from '../../../components/AddItem'
import Label from '../../../components/Label'
import color from '../../../styles/colors'
import DefaultInput from '../../../components/DefaultInput';
import DateTimePicker from '../../../components/DateTimePicker'
import { TextInput } from 'react-native-paper';
import Colors from '../../../components/GradientColor'
import GradientItem from '../../../components/GradientItem'
import DefaultButton from '../../../components/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import method from './method'
import Moment from 'moment';

var {height, width} = Dimensions.get('window');

const AddSyllabus = ({
    onPress,
    setModalVisible,
    modalVisible,
    ...props
  }) => {

    const {
        bgColor,
        selectedColor,
        classSyllabus,
        setClassSyllabus,
        setSelectedColor,
        handleAddSyllabus
    } = method();

    const [calendarVisible, setCalendarVisible] = useState(false);
    const colors = [0,1,2,3,4,5,6,7,8,9,10,11];

    return (
        <SafeAreaView>
        <Modal
          useNativeDriver={true}
          backdropColor='rgba(0, 0, 0, 0.7)'
          backdropOpacity={0.5}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          //isVisible={props.modalVisible}
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          style={styles.modal}
          onBackButtonPress={props.onClose}
          onBackdropPress={props.onClose}>

            <View style={styles.modalContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible); }}>
                        <Image 
                            source={require('../../../assets/icons/closeButton.png')}
                            resizeMode='contain'
                            style={styles.close}
                        />
                    </TouchableOpacity>
                    <View style={styles.fieldContainer}>
                        <Label text="Add your Syllabus" />
                        <AddItem />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Input the Class Name or Class Code" />
                        <DefaultInput 
                            label="Class Name"
                            value={classSyllabus.className}
                            onChangeText={(className) =>  setClassSyllabus({...classSyllabus, className: className})}
                            hasValue={classSyllabus.className.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="What's the name of your teacher?" />
                        <DefaultInput 
                            label="Name of Teacher"
                            value={classSyllabus.teacherName}
                            onChangeText={(teacherName) =>  setClassSyllabus({...classSyllabus, teacherName: teacherName})}
                            hasValue={classSyllabus.teacherName.length}
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="What's your Schedule?" />
                        <DefaultInput 
                            label="Schedule"
                            onPressIn={() => { setCalendarVisible(true)}}
                            editable={false}
                            value={classSyllabus.schedule}
                            hasValue={classSyllabus.schedule.length}
                        /> 
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
                    <View style={styles.fieldContainer}>
                        <DefaultButton title="Save" 
                                       onPress={() => { handleAddSyllabus()
                                                        setModalVisible(!modalVisible)}}
                        />       
                    </View>
                </ScrollView>
            </View>
            <DateTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
                showTimePicker={true}
                onSelectDate={() => {setCalendarVisible(!calendarVisible)
                                     var scheduleDateTime = classSyllabus.schedule + ' ' + Moment(classSyllabus.scheduleTime).format("hh:mm A")
                                     setClassSyllabus({...classSyllabus, schedule: scheduleDateTime})
                                    }}
                onChangeDate={(schedule) =>  setClassSyllabus({...classSyllabus, schedule: Moment(schedule).format("MM/DD/YYYY")})}
                onChangeTime={(scheduleTime) =>  setClassSyllabus({...classSyllabus, scheduleTime: scheduleTime})}
                time={classSyllabus.scheduleTime}
            />
          </Modal>

          
      </SafeAreaView>
            
        
    )
}

export default AddSyllabus;