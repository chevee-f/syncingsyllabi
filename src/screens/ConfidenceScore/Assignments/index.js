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


const Assignments = ({
    ...props
  }) => {
    
    const [notes, setNotes] = useState('');

    return (
        <ScrollView>
            <View style={{flex:1, marginBottom: 30}}>
                {props.assignments.map(res => {
                return (
                        <View>
                            <View style={styles.container}>
                                <View style={styles.labelContainer}>
                                    <Label text={res.item.title} />
                                </View>
                                <View style={styles.scoreContainer}>
                                    <Text style={[label.smallHeading2,{color:color.primary, textAlign: 'center'}]}>Syncing Score</Text>
                                </View>
                            </View>
                            <View>
                                <RadioButtonGroup items={res.item.scoreItems} />
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
                    <DefaultButton title="Save Assignment" />       
                </View>
            </View>
        </ScrollView>
    )
}

export default Assignments;