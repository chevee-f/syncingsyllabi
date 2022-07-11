import React, { useState, useContext } from 'react';
import {View, Dimensions, SafeAreaView,Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'
import Modal from "react-native-modal";
import color from '../../styles/colors'
import DatePicker from 'react-native-date-picker'
import DefaultButton from '../../components/DefaultButton'
import CancelButton from '../../components/SecondaryButton'
import { DayPicker } from 'react-native-picker-weekday'
import label from '../../styles/label'
import Moment from 'moment';
import { Swipeable, FlatList } from 'react-native-gesture-handler';
import {Context as AuthContext} from '../../components/Context/AuthContext';

var {height, width} = Dimensions.get('window');

const WeekdayTimePicker = ({
    //onPress,
    weekday,
    setWeekday,
    ...props
  }) => {

    //const [weekday, setWeekday] = React.useState(-1)
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);
    const { state } = useContext(AuthContext);

    const onTrigger = (index) => {
        props.parentCallback(index);
    }

    const emptyListMessage = () =>
    <View style={styles.emptyContainer}>
        <Text style={[label.smallHeading, {color: '#a7a6ab'}]}>Your schedule list is empty</Text>
    </View>


    const SwipeableRow = ({ item, index }) => {
        return (   
            <Swipeable
            friction={2}
            leftThreshold={30}
            rightThreshold={40}
            renderRightActions={() => renderRightActions(index)}>
                <Row item={item} />
            </Swipeable>
        );
    };

  
    const renderRightAction = (action, imgSrc, index) => {
        return (
            <TouchableOpacity
                onPress={() => onTrigger(index)}
                style={[styles.action,{backgroundColor: action === 'remove' ? color.error : color.warning }]}>
              <Image 
                  source={imgSrc}
                  resizeMode='contain'
                  style={styles.icon}
              />
            </TouchableOpacity>
        );
    };
    
    
    const renderRightActions = (index) => (
        <View style={styles.actionContainer}>
            {/*renderRightAction('edit', require('../../assets/icons/NotePencil.png'),index)*/}
            {renderRightAction('remove', require('../../assets/icons/X.png'),index)}
        </View>
    );

    const Row = ({ item }) => (
        <View style={styles.row}>
            <Text>{item.schedule}</Text>
        </View> 
    );

    return (
        <SafeAreaView>
            <Modal
                useNativeDriver={true}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropColor='rgba(0, 0, 0, 0.7)'
                backdropOpacity={0.5}
                isVisible={props.modalVisible}
                hideModalContentWhileAnimating
                style={styles.modal}
                onBackButtonPress={props.onClose}
                onBackdropPress={props.onClose}>

                <View style={[styles.modalContainer,{backgroundColor: state.isDarkTheme === 'true' ? color.darkTheme : '#f2f1f6'}]}>
                    <Text style={[label.boldMediumHeading, {color: color.primary, alignSelf:'flex-start'}]}>{props.title}</Text>
                    <View style={styles.weekPicker}>
                        <DayPicker
                            weekdays={weekday}
                            setWeekdays={setWeekday}
                            activeColor={color.primary}
                            textColor='white'
                            inactiveColor='grey'
                        />
                    </View>
                    <View>
                        <Text style={[label.boldExtraSmallHeading, styles.time]}>TIME</Text>
                        <View style={styles.timeContainer}>
                           <View>
                                <View style={styles.timeSubContainer}>
                                    <Text style={[label.boldSmallHeading,styles.timeLabel]}>From</Text>
                                    <TouchableOpacity onPress={() => { setShowStartTime(true)
                                                                       setShowEndTime(false) }} 
                                                    style={styles.timeValueContainer}>
                                        <Text style={[label.smallHeading, {color: color.primary}]}>{Moment(props.startTime).format("hh:mm A")}</Text>
                                    </TouchableOpacity>
                                </View>
                                {showStartTime &&
                                    <View>
                                        <View style={styles.dateTimePickerHeader}>
                                            <TouchableOpacity onPress={() => { setShowStartTime(false)
                                                                                setShowEndTime(false) }} >
                                            <Text style={{ color:'#218bf7',fontWeight:'bold'}}>
                                                Done
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <View style={styles.horizontalLine} />
                                        <DatePicker 
                                                mode="time"
                                                textColor={color.primary}
                                                date={props.startTime} 
                                                onDateChange={props.onChangeStartTime}
                                            />
                                        </View>
                                    </View>
                                }
                           </View>
                            
                            <View style={{backgroundColor:'#c9c8cd4f',height:1}} />
                            <View>
                                <View style={styles.timeSubContainer}>
                                    <Text style={[label.boldSmallHeading,styles.timeLabel]}>To</Text>
                                    <TouchableOpacity onPress={() => { setShowStartTime(false)
                                                                       setShowEndTime(true) }} 
                                                    style={styles.timeValueContainer}>
                                        <Text style={[label.smallHeading, {color: color.primary}]}>{Moment(props.endTime).format("hh:mm A")}</Text>
                                    </TouchableOpacity>
                                </View>
                                {showEndTime &&
                                    <View>
                                        <View style={styles.dateTimePickerHeader}>
                                            <TouchableOpacity onPress={() => { setShowStartTime(false)
                                                                               setShowEndTime(false) }} >
                                            <Text style={{ color:'#218bf7',fontWeight:'bold'}}>
                                                Done
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <View style={styles.horizontalLine} />

                                            <DatePicker 
                                                mode="time"
                                                textColor={color.primary}
                                                date={props.endTime} 
                                                onDateChange={props.onChangeEndTime}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={styles.addContainer}>
                            <DefaultButton title="Add Schedule" onPress={props.add} containerStyle={styles.addButton}/>
                        </View>
                        <View style={styles.flatListContainer}>
                            <FlatList
                                data={props.list}
                                renderItem={({ item, index }) => (
                                    <SwipeableRow item={item} index={index} />
                                 )}
                                ListEmptyComponent={emptyListMessage}
                            />
                        </View>
                    </View>
                   
                    <View style={styles.buttonContainer}>
                        <CancelButton title="Cancel" containerStyle={styles.button} onPress={props.onClose} />
                        <DefaultButton title="Done" containerStyle={styles.button} onPress={props.onConfirm} />
                    </View>
                </View>
            </Modal>
      </SafeAreaView>
            
        
    )
}

export default WeekdayTimePicker;