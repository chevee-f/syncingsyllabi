import React, { useState, useEffect } from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import styles from './styles'
import color from '../../styles/colors'
import { TextInput } from 'react-native-paper';

//const RadioButton = props => {
const RadioButton = ({
    setValue,
    value,
    ...props
    }) => {
    //const [value, setValue] = useState(0);
    const [duedateHasError, setDuedateHasError] = useState(false);
    const [otherVal, setOtherVal] = useState('')
    useEffect(()=>{
        setOtherVal('')
    }, [props.scanCount])
    const showDueDateField = () => {
        let d = new Date(value);
        // console.log(props.calendarValue)

        let selectedDateY;
        if(String(d) !== 'Invalid Date') {
            let m = (d.getMonth()+1);
            if(m.toString().length === 1) {
                m = "0" + m;
            }
            let dt = d.getDate();
            if(dt.toString().length === 1) {
                dt = "0" + dt;
            }
            selectedDateY = d.getFullYear() + "-" + m + "-" + dt;
        } else {
            selectedDateY = ''
        }
        
        // if(props.calendarValue != '') {
            
        // }
        if(props.items.length > 0 && props.items.find(x => x !== null && x.name === value) && value !== '' && value !== 0)
            selectedDateY = ''
        return (
            Platform.OS === 'android' ? 
            <TouchableOpacity activeOpacity={1.0} onPress={() => props.setCalendarVisible(true, props.index)}>
                <View style={[styles.inputContainer, {borderColor: !duedateHasError ? color.default : 'red'}]}>
                    <DefaultInput 
                        style={[styles.input]}
                        placeholder="DD/MM/YYYY"
                        value={selectedDateY}
                        editable={false}
                        selectionColor={color.primary}
                        activeUnderlineColor={color.primary}
                        theme={{ colors: { text: color.primary, placeholder: color.default } }}
                    />
                </View>
            </TouchableOpacity> :
            <DefaultInput 
                label="Due date"
                onPressIn={() => { props.setCalendarVisible(true, props.index)}}
                editable={false}
                value={selectedDateY}
                hasValue={selectedDateY.length}
            />
        )
    }
    
    // useEffect(() => {
    //     console.log("============RELOADING OTHERVALUE=========");
    // }, []);

    return (
        <View>
            {props.items.map((res, index) => {
                var name, confidenceScore;
                if(!res) {
                    name = '';
                    confidenceScore = 0;
                } else {
                    name = res.name;
                    confidenceScore = res.confidenceScore;
                }
                // console.log(value + " = " + name + " " + (value === name))
                return (
                    <View key={Math.random()} style={[styles.container, {...props.containerStyle}]}>
                        <View style={[{minHeight: 50, marginBottom: -10},styles.subContainer]}>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    setValue(name)
                                    if(props.tab == 'assignments')
                                        props.setAssignmentValue(props.index, name);
                                }}>
                                    {value === name ? <View style={styles.selectedRb} /> : value === 0 && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                                <Text style={styles.radioText}>{name}</Text>
                        </View>
                        {name !== null &&
                            <View style={styles.scoreContainer}>
                                <Text style={[styles.scoreText,{color: confidenceScore > 85 ? color.green : color.warning}]}>
                                    {`${Math.round(confidenceScore)}%`}
                                </Text>
                            </View>
                        }
                    </View>
                );
            })}
            <View style={[styles.container, {...props.containerStyle}]}>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        style={styles.radioCircle}
                        onPress={() => {
                            setValue('other');
                            if(props.tab == 'assignments')
                                props.setAssignmentValue(props.index, 'other');
                        }}>
                            {!props.items.find(x => x !== null && x.name === value) && value !== '' && value !== 0 && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        {props.fieldType == 'date' ? 
                        showDueDateField()
                          :
                        <DefaultInput 
                            label="Other"
                            onChangeText={(otherValue) =>  {
                                setValue(otherValue);
                                setOtherVal(otherValue)
                                if(props.tab == 'assignments')
                                    props.setAssignmentValue(props.index, otherValue);
                            }}
                            value={otherVal}
                        /> 
                        }
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RadioButton;
