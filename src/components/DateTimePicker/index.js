import React, { useState, useContext } from 'react';
import {TouchableOpacity, View, Dimensions, SafeAreaView, Text } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import color from '../../styles/colors'
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker'
import DefaultButton from '../../components/DefaultButton'
import CancelButton from '../../components/SecondaryButton'
import {Context as AuthContext} from '../../components/Context/AuthContext';

var {height, width} = Dimensions.get('window');

const DateTimePicker = ({
    onPress,
    ...props
  }) => {

    const { state } = useContext(AuthContext);
    // console.log(new Date(Date.parse(props.time)) + "--- props.time")
    // console.log(new Date(Date.parse(props.selectedDate)))
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

                <View style={[styles.modalContainer,{backgroundColor: state.isDarkTheme === 'true' ? color.darkTheme : '#fff'}]}>
                    <CalendarPicker
                        previousComponent={<Icon name="chevron-thin-left" color={color.primary} size={20} />} 
                        nextComponent={<Icon name="chevron-thin-right" color={color.primary} size={20} />} 
                        textStyle={[styles.textStyle,{color: state.isDarkTheme === 'true' ? color.default : color.primary}]}
                        selectedDayColor={color.primary}
                        todayBackgroundColor='#fff'
                        selectedDayTextColor='#fff'
                        todayTextStyle={{color:color.primary}}
                        dayLabelsWrapper={styles.dayLabelsWrapper}
                        width={width * 0.92}
                        monthTitleStyle={styles.titleStyle}
                        yearTitleStyle={styles.titleStyle}
                        onDateChange={props.onChangeDate}
                        initialDate={props.selectedDate}
                        selectedStartDate={new Date(Date.parse(props.selectedDate))}
                    />

                    {props.showTimePicker &&
                        <View style={{alignItems:'center'}}>
                             <View style={styles.horizontalLine} />

                            <DatePicker 
                                mode="time"
                                textColor={color.primary}
                                date={new Date(Date.parse(props.time))} 
                                onDateChange={props.onChangeTime}
                            />
                        </View>
                    }

                    {props.showAllAssignment &&
                        <TouchableOpacity
                            style={styles.showAllButtonContainer}
                            onPress={props.showAllAssignments}>
                            <Text style={styles.showAllButton}>Show All</Text>
                        </TouchableOpacity>
                    }

                    <View style={[styles.buttonContainer, props.showAllAssignment ? {display: 'none'}: {}]}>
                        <CancelButton title="Cancel" containerStyle={styles.button} onPress={props.onClose} />
                        <DefaultButton title="Done" containerStyle={styles.button} onPress={props.onSelectDate} />
                    </View>
                </View>
            </Modal>
      </SafeAreaView>
            
        
    )
}

export default DateTimePicker;