import React, { useState } from 'react';
import {View, Dimensions, SafeAreaView } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import color from '../../styles/colors'
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker'
import DefaultButton from '../../components/DefaultButton'
import CancelButton from '../../components/SecondaryButton'

var {height, width} = Dimensions.get('window');

const DateTimePicker = ({
    onPress,
    ...props
  }) => {

    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='slideInUp'
                animationOut='slideOutDown'
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                isVisible={props.modalVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={styles.modalContainer}>
                    <CalendarPicker
                        previousComponent={<Icon name="chevron-thin-left" color={color.primary} size={20} />} 
                        nextComponent={<Icon name="chevron-thin-right" color={color.primary} size={20} />} 
                        textStyle={styles.textStyle}
                        selectedDayColor={color.primary}
                        todayBackgroundColor='#fff'
                        selectedDayTextColor='#fff'
                        todayTextStyle={{color:color.primary}}
                        dayLabelsWrapper={styles.dayLabelsWrapper}
                        width={width * 0.92}
                        monthTitleStyle={styles.titleStyle}
                        yearTitleStyle={styles.titleStyle}
                        onDateChange={props.onChangeDate}
                        date={props.selectedDate}
                    />

                    {props.showTimePicker &&
                        <View style={{alignItems:'center'}}>
                             <View style={styles.horizontalLine} />

                            <DatePicker 
                                mode="time"
                                textColor={color.primary}
                                date={props.time} 
                                onDateChange={props.onChangeTime}
                            />
                        </View>
                    }

                    <View style={styles.buttonContainer}>
                        <CancelButton title="Cancel" containerStyle={styles.button} onPress={props.onClose} />
                        <DefaultButton title="Done" containerStyle={styles.button} onPress={props.onSelectDate} />
                    </View>
                </View>
            </Modal>
      </SafeAreaView>
            
        
    )
}

export default DateTimePicker;