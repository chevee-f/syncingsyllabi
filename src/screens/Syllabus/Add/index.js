import React, { useState } from 'react';
import { View, 
         Dimensions, 
         SafeAreaView,
         Image ,
         ScrollView
        } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import AddItem from '../../../components/AddItem'
import Label from '../../../components/Label'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import DefaultInput from '../../../components/DefaultInput';
import DateTimePicker from '../../../components/DateTimePicker'
import { TextInput } from 'react-native-paper';
import Colors from '../../../components/GradientColor'
import DefaultButton from '../../../components/DefaultButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

var {height, width} = Dimensions.get('window');

const AddSyllabus = ({
    onPress,
    setModalVisible,
    modalVisible,
    ...props
  }) => {

    const [calendarVisible, setCalendarVisible] = useState(false);
    var colors = [ 1,2,3,4,5,6,7,8,9,10,11,12 ];

    return (
        <SafeAreaView>
        <Modal
          useNativeDriver={true}
          backdropColor='rgba(0, 0, 0, 0.7)'
          backdropOpacity={0.5}
          animationIn='slideInUp'
          animationOut='fadeOut'
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
                        /> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="What's the name of your teacher?" />
                        <DefaultInput 
                            label="Name of Teacher"
                        /> 
                    </View>
                    <View style={{marginVertical:10}}>
                        <Label text="What's your Schedule?" />
                            <View style={[styles.inputContainer, {borderColor: color.default}]}>
                                <TextInput
                                    mode="flat"
                                    style={[styles.input]}
                                    onPressIn={() => { setCalendarVisible(true)}}
                                    label="Schedule"
                                    editable={false}
                                    selectionColor={color.primary}
                                    activeUnderlineColor={color.primary}
                                    theme={{ colors: { text: color.primary, placeholder: color.default } }}
                                />
                            </View> 
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Pick a color" />
                        <View style={{flexDirection:'row'}}>
                            <ScrollView horizontal>
                                {
                                    colors.map((item) => {
                                        return (
                                            <Colors />
                                        );
                                    })                
                                }              
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Label text="Preview" />
                        <Colors containerStyle={{alignSelf:'center'}} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <DefaultButton title="Save" />       
                    </View>
                </ScrollView>
            </View>
            <DateTimePicker 
                onClose={() => { setCalendarVisible(!calendarVisible); }}
                modalVisible={calendarVisible} 
            />
          </Modal>

          
      </SafeAreaView>
            
        
    )
}

export default AddSyllabus;