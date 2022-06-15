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
                return (
                    <View key={res.key} style={styles.container}>
                        <View style={styles.subContainer}>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    setValue(res.key)
                                }}>
                                    {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                            {res.key !== null ?
                                <Text style={styles.radioText}>{res.text}</Text> :
                                <View style={styles.inputContainer}>
                                    <DefaultInput 
                                        label="Other"
                                    /> 
                                </View>
                            }
                        </View>
                        {res.key !== null &&
                            <View style={styles.scoreContainer}>
                                <Text style={[styles.scoreText,{color: res.score > 85 ? color.green : color.warning}]}>
                                    {`${res.score}%`}
                                </Text>
                            </View>
                        }
                    </View>
                );
            })}
            {/*
                <Text> Selected: {value} </Text>
            */}
        </View>
    );
};

export default RadioButton;
