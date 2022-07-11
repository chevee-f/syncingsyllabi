import React, { useState } from 'react';
import { Text, 
         View, 
         ScrollView,
         TextInput } from 'react-native';
import Label from '../../../components/Label'
import RadioButtonGroup from '../../../components/RadioButtonGroup'
import DefaultButton from '../../../components/DefaultButton';
import SecondaryButton from '../../../components/SecondaryButton';
import styles from './styles'
import label from '../../../styles/label'
import color from '../../../styles/colors'
import method from './method';
import { useNavigation } from '@react-navigation/native';

const Assignments = ({
    classSyllabi,
    setClassSyllabi,
    ...props
  }) => {
    
    const navigation = useNavigation();
    const [notes, setNotes] = useState('');
    const [value, setValue] = useState(0);
    const {
    } = method(classSyllabi,setClassSyllabi);

    return (
        <ScrollView>
            <View style={{flex:1, marginBottom: 30}}>
                {props.items.map(res => {
                return (
                        <View>
                            <View style={styles.container}>
                                <View style={styles.labelContainer}>
                                    <Label text={res.title} />
                                </View>
                                <View style={styles.scoreContainer}>
                                    <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
                                </View>
                            </View>
                            <View>
                                {res.field === 'subjectTitle' ?
                                    <RadioButtonGroup items={props.assignments.subjectTitle} setValue={(value) => setValue(value)} value={value} />
                                    : res.field === 'dueDate' ?
                                    <RadioButtonGroup items={props.assignments.dueDate} setValue={(value) => setValue(value)} value={value} />
                                    :<RadioButtonGroup items={props.assignments.classAssigned} setValue={(value) => setValue(value)} value={value} />
                                }
                            </View>
                        </View>
                    );
                })}
                <View style={styles.fieldContainer}>
                    <Label text="Note" />
                    <TextInput 
                        multiline
                        numberOfLines={8}
                        placeholder="Write a note..."
                        placeholderTextColor={'#af8811'}
                        style={styles.note}
                        value={notes}
                        onChangeText={(notes) =>  setNotes(notes)}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Label text="Attachments" />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={[label.smallHeading,{color: color.primary}]}>No Attachments</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <SecondaryButton 
                        title="Add File" 
                        imgSource={require('../../../assets/icons/Plus.png')} 
                        containerStyle={styles.addFileButton} 
                    />       
                </View>
                <View style={styles.fieldContainer}>
                    <DefaultButton title="Save Assignment" onPress={() => navigation.navigate("MainTabScreen")} />       
                </View>
            </View>
        </ScrollView>
    )
}

export default Assignments;