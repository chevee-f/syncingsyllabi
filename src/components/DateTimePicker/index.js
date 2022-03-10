import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity,SafeAreaView } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import label from '../../styles/label'
import color from '../../styles/colors'
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker'
import DefaultButton from '../../components/DefaultButton'
import CancelButton from '../../components/SecondaryButton'

var {height, width} = Dimensions.get('window');

const SelectSyllabus = ({
    onPress,
    ...props
  }) => {
    const [date, setDate] = useState(new Date())

    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='slideInUp'
                animationOut='fadeOut'
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                isVisible={props.modalVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={styles.modalContainer}>
                    <CalendarPicker
                        previousComponent={<Icon 
                                            name="chevron-thin-left"
                                            color={color.primary}
                                            size={20} />
                                          } 
                        nextComponent={<Icon 
                                        name="chevron-thin-right"
                                        color={color.primary}
                                        size={20} />
                                      } 
                        textStyle={styles.textStyle}
                        selectedDayColor={color.primary}
                        todayBackgroundColor='#fff'
                        selectedDayTextColor='#fff'
                        todayTextStyle={{color:color.primary}}
                        dayLabelsWrapper={styles.dayLabelsWrapper}
                        width={width * 0.92}
                        monthTitleStyle={styles.titleStyle}
                        yearTitleStyle={styles.titleStyle}
                    />
                    <View style={styles.horizontalLine} />

                    <DatePicker 
                        mode="time"
                        textColor={color.primary}
                        date={date} 
                        onDateChange={setDate} />

                    <View style={{flexDirection:'row',width:width * 0.84,justifyContent:'space-between'}}>
                        <CancelButton title="Cancel" containerStyle={{width: width * 0.4}} />
                        <DefaultButton title="Done" containerStyle={{width: width * 0.4}} />
                    </View>
                </View>
            </Modal>
      </SafeAreaView>
            
        
    )
}

export default SelectSyllabus;