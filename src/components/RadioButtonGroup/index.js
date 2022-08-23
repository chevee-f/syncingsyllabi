import React, { useState } from 'react';
import { Text,View,TouchableOpacity } from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import styles from './styles'
import color from '../../styles/colors'

//const RadioButton = props => {
const RadioButton = ({
    setValue,
    value,
    ...props
    }) => {
    //const [value, setValue] = useState(0);

    return (
        <View>
            {props.items.map(res => {
                var name = res.name 
                return (
                    <View style={[styles.container, {...props.containerStyle}]}>
                        <View style={styles.subContainer}>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    setValue(name)
                                }}>
                                    {value === name && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                                <Text style={styles.radioText}>{name}</Text>
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
            <View style={[styles.container, {...props.containerStyle}]}>
                <View style={styles.subContainer}>
                    <TouchableOpacity
                        style={styles.radioCircle}
                        onPress={() => setValue('other')}>
                            {!props.items.find(x => x.name === value) && value !== '' && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <DefaultInput 
                            label="Other"
                            onChangeText={(otherValue) =>  setValue(otherValue)}
                        /> 
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RadioButton;
