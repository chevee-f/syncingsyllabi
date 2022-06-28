import React, { useState } from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import styles from './styles'
import color from '../../styles/colors'

const RadioButton = props => {
    const [value, setValue] = useState(0);

    return (
        <View>
            {props.items.map(res => {
                var name = props.fieldName === 'teacherName' ? res.teacherName : 
                            props.fieldName === 'classCode' ? res.classCode :
                            props.fieldName === 'className' ? res.className : 
                            props.fieldName === 'classSchedule' ? res.classSchedule :
                            props.fieldName === 'subjectTitle' ? res.subjectTitle :
                            props.fieldName === 'dueDate' ? res.dueDate : res.classAssigned
                return (
                    <View style={styles.container}>
                        <View style={styles.subContainer}>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    setValue(name)
                                }}>
                                    {value === name && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                            {name !== null ?
                                <Text style={styles.radioText}>{name}</Text> :
                                <View style={styles.inputContainer}>
                                    <DefaultInput 
                                        label="Other"
                                    /> 
                                </View>
                            }
                        </View>
                        {name !== null &&
                            <View style={styles.scoreContainer}>
                                <Text style={[styles.scoreText,{color: res.confidenceScore > 85 ? color.green : color.warning}]}>
                                    {`${Math.round(res.confidenceScore)}%`}
                                </Text>
                            </View>
                        }
                    </View>
                );
            })}
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        style={styles.radioCircle}
                        onPress={() => {
                            setValue('other')
                        }}>
                            {value === 'other' && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            label="Other"
                        /> 
                    </View>
                </View>
            </View>
            {/*
                <Text> Selected: {value} </Text>
            */}
        </View>
    );
};

export default RadioButton;
